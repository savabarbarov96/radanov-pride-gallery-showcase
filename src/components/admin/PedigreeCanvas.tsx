import { useState, useEffect, useRef } from 'react';
import { catService, CatData } from '@/services/catService';
import { PedigreeConnection } from '@/types/pedigree';
import { useDragAndDrop } from '@/hooks/useDragAndDrop';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import CatImageWithFallback from '@/components/CatImageWithFallback';

// Extended type to handle both service and Convex data
interface ExtendedCatData extends CatData {
  _id?: string;
}

interface CanvasNode {
  cat: ExtendedCatData;
  x: number;
  y: number;
  id: string;
}

interface PedigreeCanvasProps {
  selectedCat: ExtendedCatData | null;
  onCanvasReady?: (canvas: { 
    addCatToCanvas: (cat: ExtendedCatData, position?: { x: number; y: number }) => void;
    loadPedigreeForCat: (cat: ExtendedCatData) => void;
    clearCanvas: () => void;
  }) => void;
}

const PedigreeCanvas = ({ selectedCat, onCanvasReady }: PedigreeCanvasProps) => {
  const [nodes, setNodes] = useState<CanvasNode[]>([]);
  const [connections, setConnections] = useState<PedigreeConnection[]>([]);
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionMode, setConnectionMode] = useState<'father' | 'mother' | null>(null);
  const [connectingFrom, setConnectingFrom] = useState<ExtendedCatData | null>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [cursorPosition, setCursorPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panOffset, setPanOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [lastPanPoint, setLastPanPoint] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  // Simple duplicate prevention
  const recentlyAddedRef = useRef<Set<string>>(new Set());

  const { startDrag, setContainer, isDragging } = useDragAndDrop({
    constrainToParent: true,
    snapToGrid: { x: 10, y: 10 },
    onDragStart: (item) => {
      console.log('Drag started for:', item.id);
    },
    onDragMove: (item, position) => {
      setNodes(prev => prev.map(node => 
        node.id === item.id ? { ...node, x: position.x, y: position.y } : node
      ));
    },
    onDragEnd: (item, position) => {
      setNodes(prev => prev.map(node => 
        node.id === item.id ? { ...node, x: position.x, y: position.y } : node
      ));
    }
  });

  useEffect(() => {
    setContainer(canvasRef.current);
  }, [setContainer]);

  useEffect(() => {
    setConnections(catService.getConnections());
    const unsubscribe = catService.subscribe(() => {
      setConnections(catService.getConnections());
    });
    return unsubscribe;
  }, []);

  const getCatUniqueId = (cat: ExtendedCatData): string => {
    return cat._id || cat.id || '';
  };

  const addCatToCanvas = (cat: ExtendedCatData, position?: { x: number; y: number }) => {
    const catUniqueId = getCatUniqueId(cat);
    
    // Check if cat is already on canvas
    const existingNode = nodes.find(node => getCatUniqueId(node.cat) === catUniqueId);
    if (existingNode) {
      // Show visual feedback that cat is already on canvas
      const element = document.querySelector(`[data-cat-id="${catUniqueId}"]`);
      if (element) {
        element.classList.add('animate-bounce');
        setTimeout(() => element.classList.remove('animate-bounce'), 1000);
      }
      toast({
        title: "Котката вече е добавена",
        description: `${cat.name} вече е на canvas-а`,
        variant: "default"
      });
      return;
    }

    // Simple duplicate prevention with timeout
    if (recentlyAddedRef.current.has(catUniqueId)) {
      return;
    }
    recentlyAddedRef.current.add(catUniqueId);
    setTimeout(() => recentlyAddedRef.current.delete(catUniqueId), 500);

    const newNode: CanvasNode = {
      cat,
      x: position?.x || Math.random() * 400 + 100,
      y: position?.y || Math.random() * 300 + 100,
      id: catUniqueId
    };

    setNodes(prev => [...prev, newNode]);
    toast({
      title: "Котка добавена",
      description: `${cat.name} е добавена на canvas-а`,
      variant: "default"
    });
  };

  const loadPedigreeForCat = (cat: ExtendedCatData) => {
    // Clear existing nodes
    setNodes([]);
    recentlyAddedRef.current.clear();
    
    // Add the main cat in the center
    addCatToCanvas(cat, { x: 300, y: 200 });

    // Add parents if they exist
    const parents = catService.getParents(cat.id || '');
    
    if (parents.mother) {
      addCatToCanvas(parents.mother, { x: 100, y: 50 });
    }

    if (parents.father) {
      addCatToCanvas(parents.father, { x: 500, y: 50 });
    }
  };

  const clearCanvas = () => {
    setNodes([]);
    setIsConnecting(false);
    setConnectingFrom(null);
    setConnectionMode(null);
    recentlyAddedRef.current.clear();
  };

  const removeCatFromCanvas = (catId: string) => {
    const removedCat = nodes.find(node => getCatUniqueId(node.cat) === catId);
    
    // Clean up connection state if this cat was being used for connections
    if (isConnecting && connectingFrom && getCatUniqueId(connectingFrom) === catId) {
      cancelConnection();
    }
    
    setNodes(prev => prev.filter(node => getCatUniqueId(node.cat) !== catId));
    
    // Remove related connections
    const connectionsToRemove = connections.filter(conn => 
      conn.parentId === catId || conn.childId === catId
    );
    
    connectionsToRemove.forEach(conn => {
      catService.removeConnection(conn.id);
    });
    
    if (removedCat) {
      toast({
        title: "Котка премахната",
        description: `${removedCat.cat.name} е премахната от canvas-а`,
        variant: "default"
      });
    }
  };

  const handleNodeMouseDown = (e: React.MouseEvent, node: CanvasNode) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isConnecting) {
      handleConnectionClick(node.cat);
      return;
    }

    startDrag(e.currentTarget as HTMLElement, node.id, node.x, node.y, e.nativeEvent);
  };

  const handleConnectionClick = (cat: CatData) => {
    if (!isConnecting || !connectingFrom || !connectionMode) return;
    
    if (getCatUniqueId(connectingFrom) === getCatUniqueId(cat)) {
      toast({
        title: "Невалидна връзка",
        description: "Котка не може да бъде родител на себе си!",
        variant: "destructive"
      });
      cancelConnection();
      return;
    }

    // Validate gender
    if (connectionMode === 'father' && connectingFrom.gender !== 'male') {
      toast({
        title: "Невалидна връзка",
        description: `${connectingFrom.name} не може да бъде баща - не е мъжки!`,
        variant: "destructive"
      });
      cancelConnection();
      return;
    }
    
    if (connectionMode === 'mother' && connectingFrom.gender !== 'female') {
      toast({
        title: "Невалидна връзка",
        description: `${connectingFrom.name} не може да бъде майка - не е женски!`,
        variant: "destructive"
      });
      cancelConnection();
      return;
    }

    // Validate circular relationships
    if (wouldCreateCircularRelationship(getCatUniqueId(connectingFrom), getCatUniqueId(cat))) {
      toast({
        title: "Невалидна връзка",
        description: "Не можете да създадете кръгова връзка в родословието!",
        variant: "destructive"
      });
      cancelConnection();
      return;
    }

    // Check if the same cat is already set as the other parent type
    const existingParents = catService.getParents(getCatUniqueId(cat));
    const otherParentType = connectionMode === 'father' ? 'mother' : 'father';
    const otherParent = otherParentType === 'mother' ? existingParents.mother : existingParents.father;
    
    if (otherParent && getCatUniqueId(otherParent) === getCatUniqueId(connectingFrom)) {
      toast({
        title: "Невалидна връзка",
        description: `${connectingFrom.name} вече е ${otherParentType === 'father' ? 'баща' : 'майка'} на ${cat.name}!`,
        variant: "destructive"
      });
      cancelConnection();
      return;
    }

    // Create connection
    catService.addConnection(getCatUniqueId(connectingFrom), getCatUniqueId(cat), connectionMode);
    toast({
      title: "Връзка създадена",
      description: `${connectingFrom.name} е свързан като ${connectionMode === 'father' ? 'баща' : 'майка'} на ${cat.name}`,
      variant: "default"
    });
    
    cancelConnection();
  };

  const wouldCreateCircularRelationship = (parentId: string, childId: string): boolean => {
    const checkAncestor = (currentId: string, targetId: string, visited = new Set<string>()): boolean => {
      if (visited.has(currentId)) return false;
      visited.add(currentId);

      const parents = catService.getParents(currentId);
      if (parents.mother?.id === targetId || parents.father?.id === targetId) {
        return true;
      }
      return (parents.mother && checkAncestor(parents.mother.id, targetId, visited)) ||
             (parents.father && checkAncestor(parents.father.id, targetId, visited));
    };

    return checkAncestor(parentId, childId);
  };

  const startConnection = (cat: CatData, type: 'father' | 'mother') => {
    setIsConnecting(true);
    setConnectingFrom(cat);
    setConnectionMode(type);
  };

  const cancelConnection = () => {
    setIsConnecting(false);
    setConnectingFrom(null);
    setConnectionMode(null);
  };

  const handleCanvasClick = (e: React.MouseEvent) => {
    // Only handle clicks on the canvas background (not on nodes)
    if (e.target === e.currentTarget && isConnecting) {
      cancelConnection();
    }
  };

  const handleCanvasMouseDown = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && e.button === 0) {
      setIsPanning(true);
      setLastPanPoint({ x: e.clientX, y: e.clientY });
    }
  };

  const handleCanvasMouseMove = (e: React.MouseEvent) => {
    if (isConnecting && canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      setCursorPosition({
        x: (e.clientX - rect.left - panOffset.x) / zoomLevel,
        y: (e.clientY - rect.top - panOffset.y) / zoomLevel
      });
    }

    if (isPanning) {
      const deltaX = e.clientX - lastPanPoint.x;
      const deltaY = e.clientY - lastPanPoint.y;
      setPanOffset(prev => ({
        x: prev.x + deltaX,
        y: prev.y + deltaY
      }));
      setLastPanPoint({ x: e.clientX, y: e.clientY });
    }
  };

  const handleCanvasMouseUp = () => {
    setIsPanning(false);
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    setZoomLevel(prev => Math.max(0.5, Math.min(2, prev * delta)));
  };

  const renderConnections = () => {
    const connectionElements = connections.map(conn => {
      const parentNode = nodes.find(n => getCatUniqueId(n.cat) === conn.parentId);
      const childNode = nodes.find(n => getCatUniqueId(n.cat) === conn.childId);
      
      if (!parentNode || !childNode) return null;

      const x1 = parentNode.x + 70;
      const y1 = parentNode.y + 70;
      const x2 = childNode.x + 70;
      const y2 = childNode.y + 70;

      return (
        <g key={conn.id}>
          <line
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke={conn.type === 'father' ? '#3b82f6' : '#ec4899'}
            strokeWidth="3"
            strokeDasharray="5,5"
          />
          <text
            x={(x1 + x2) / 2}
            y={(y1 + y2) / 2 - 15}
            textAnchor="middle"
            fontSize="12"
            fill={conn.type === 'father' ? '#3b82f6' : '#ec4899'}
            className="font-medium"
          >
            {conn.type === 'father' ? 'Баща' : 'Майка'}
          </text>
          <circle
            cx={(x1 + x2) / 2}
            cy={(y1 + y2) / 2}
            r="12"
            fill="white"
            stroke={conn.type === 'father' ? '#3b82f6' : '#ec4899'}
            strokeWidth="2"
            className="cursor-pointer hover:fill-red-50 transition-colors"
            onClick={() => {
              catService.removeConnection(conn.id);
              toast({
                title: "Връзка премахната",
                description: "Родителската връзка е премахната",
                variant: "default"
              });
            }}
          />
        </g>
      );
    });

    // Add connection preview line
    if (isConnecting && connectingFrom) {
      const sourceNode = nodes.find(n => getCatUniqueId(n.cat) === getCatUniqueId(connectingFrom));
      
      if (sourceNode) {
        const x1 = sourceNode.x + 70;
        const y1 = sourceNode.y + 70;
        const x2 = cursorPosition.x;
        const y2 = cursorPosition.y;

        connectionElements.push(
          <g key="connection-preview">
            <defs>
              <marker
                id="arrowhead"
                markerWidth="10"
                markerHeight="7"
                refX="9"
                refY="3.5"
                orient="auto"
              >
                <polygon
                  points="0 0, 10 3.5, 0 7"
                  fill={connectionMode === 'father' ? '#3b82f6' : '#ec4899'}
                />
              </marker>
            </defs>
            <line
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={connectionMode === 'father' ? '#3b82f6' : '#ec4899'}
              strokeWidth="3"
              strokeDasharray="8,4"
              className="animate-pulse"
              markerEnd="url(#arrowhead)"
            />
          </g>
        );
      }
    }

    return connectionElements;
  };

  // Expose canvas methods to parent
  useEffect(() => {
    if (onCanvasReady) {
      onCanvasReady({
        addCatToCanvas,
        loadPedigreeForCat,
        clearCanvas
      });
    }
  }, [onCanvasReady]);

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Toolbar */}
      <div className="flex items-center justify-between p-4 bg-white border-b">
        <div className="flex items-center gap-4">
          <h2 className="font-playfair text-xl font-semibold">Pedigree Canvas</h2>
          {selectedCat && (
            <Button
              onClick={() => loadPedigreeForCat(selectedCat)}
              variant="outline"
              size="sm"
            >
              Load Pedigree for {selectedCat.name}
            </Button>
          )}
        </div>

        <div className="flex items-center gap-2">
          {isConnecting && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">
                Connecting {connectingFrom?.name} as {connectionMode}...
              </span>
              <Button onClick={cancelConnection} variant="outline" size="sm">
                Cancel
              </Button>
            </div>
          )}

          <Button
            onClick={clearCanvas}
            variant="outline"
            size="sm"
          >
            Clear Canvas
          </Button>

          <div className="flex items-center gap-2">
            <Button
              onClick={() => setZoomLevel(prev => Math.min(2, prev * 1.2))}
              variant="outline"
              size="sm"
            >
              +
            </Button>
            <span className="text-sm w-12 text-center">{Math.round(zoomLevel * 100)}%</span>
            <Button
              onClick={() => setZoomLevel(prev => Math.max(0.5, prev / 1.2))}
              variant="outline"
              size="sm"
            >
              -
            </Button>
          </div>
        </div>
      </div>

      {/* Canvas */}
      <div className="flex-1 relative overflow-hidden">
        <div
          ref={canvasRef}
          data-drop-zone="canvas"
          className="w-full h-full cursor-grab active:cursor-grabbing"
          onClick={handleCanvasClick}
          onMouseDown={handleCanvasMouseDown}
          onMouseMove={handleCanvasMouseMove}
          onMouseUp={handleCanvasMouseUp}
          onWheel={handleWheel}
        >
          <div
            className="absolute inset-0 origin-top-left"
            style={{
              transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoomLevel})`,
              transformOrigin: '0 0'
            }}
          >
            {/* SVG for connections */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
              {renderConnections()}
            </svg>

            {/* Cat nodes */}
            {nodes.map((node) => {
              const nodeUniqueId = getCatUniqueId(node.cat);
              return (
                <div
                  key={node.id}
                  data-cat-id={nodeUniqueId}
                  className={`absolute bg-white rounded-lg shadow-lg border-2 transition-all duration-200 z-20 ${
                    isDragging ? 'cursor-grabbing' : isConnecting && connectingFrom && getCatUniqueId(connectingFrom) !== nodeUniqueId ? 'cursor-pointer' : 'cursor-grab'
                  } ${
                    hoveredNode === node.id ? 'shadow-xl scale-105' : ''
                  } ${
                    connectingFrom && getCatUniqueId(connectingFrom) === nodeUniqueId ? 'ring-4 ring-blue-500 ring-opacity-75 bg-blue-50' : 'border-gray-200'
                  } ${
                    isConnecting && connectingFrom && getCatUniqueId(connectingFrom) !== nodeUniqueId ? 'hover:ring-2 hover:ring-green-400 hover:bg-green-50' : ''
                  }`}
                  style={{
                    left: node.x,
                    top: node.y,
                    width: '140px',
                    height: '140px'
                  }}
                  onMouseDown={(e) => handleNodeMouseDown(e, node)}
                  onMouseEnter={() => setHoveredNode(node.id)}
                  onMouseLeave={() => setHoveredNode(null)}
                >
                  <div className="w-full h-full p-2 flex flex-col">
                    <div className="flex-1 bg-gray-100 rounded overflow-hidden">
                      <CatImageWithFallback
                        src={node.cat.image}
                        alt={node.cat.name}
                        className="w-full h-full"
                      />
                    </div>
                    <div className="mt-1 text-center">
                      <p className="text-xs font-semibold truncate">{node.cat.name}</p>
                      <p className="text-xs text-gray-600">
                        {node.cat.gender === 'male' ? '♂' : '♀'} {node.cat.age}
                      </p>
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="absolute -top-2 -right-2 flex gap-1">
                    {!isConnecting && (
                      <>
                        <button
                          className="w-7 h-7 bg-blue-500 text-white rounded-full text-sm flex items-center justify-center hover:bg-blue-600 hover:scale-110 transition-all duration-200 shadow-lg"
                          onClick={(e) => {
                            e.stopPropagation();
                            startConnection(node.cat, 'father');
                          }}
                          title="Свържи като баща"
                        >
                          ♂
                        </button>
                        <button
                          className="w-7 h-7 bg-pink-500 text-white rounded-full text-sm flex items-center justify-center hover:bg-pink-600 hover:scale-110 transition-all duration-200 shadow-lg"
                          onClick={(e) => {
                            e.stopPropagation();
                            startConnection(node.cat, 'mother');
                          }}
                          title="Свържи като майка"
                        >
                          ♀
                        </button>
                      </>
                    )}
                    <button
                      className="w-7 h-7 bg-red-500 text-white rounded-full text-sm flex items-center justify-center hover:bg-red-600 hover:scale-110 transition-all duration-200 shadow-lg"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeCatFromCanvas(nodeUniqueId);
                      }}
                      title="Премахни от canvas"
                    >
                      ×
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Instructions */}
        {nodes.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center text-gray-500">
              <p className="text-lg mb-2">🐱 Empty Canvas</p>
              <p className="text-sm">Drag cats from the gallery or click "Load Pedigree" to start</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PedigreeCanvas;