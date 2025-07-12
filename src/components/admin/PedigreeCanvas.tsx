import { useState, useEffect, useRef } from 'react';
import { catService, CatData } from '@/services/catService';
import { PedigreeConnection } from '@/types/pedigree';
import { useDragAndDrop } from '@/hooks/useDragAndDrop';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface PedigreeCanvasProps {
  selectedCat: CatData | null;
  onCanvasReady?: (canvas: { addCatToCanvas: (cat: CatData, position?: { x: number; y: number }) => void }) => void;
}

interface CanvasNode {
  cat: CatData;
  x: number;
  y: number;
  id: string;
}

const PedigreeCanvas = ({ selectedCat, onCanvasReady }: PedigreeCanvasProps) => {
  const [nodes, setNodes] = useState<CanvasNode[]>([]);
  const [connections, setConnections] = useState<PedigreeConnection[]>([]);
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionMode, setConnectionMode] = useState<'father' | 'mother' | null>(null);
  const [connectingFrom, setConnectingFrom] = useState<CatData | null>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [cursorPosition, setCursorPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const { startDrag, setContainer, isDragging } = useDragAndDrop({
    constrainToParent: true,
    snapToGrid: { x: 10, y: 10 },
    onDragStart: (item) => {
      // Visual feedback when drag starts
      console.log('Drag started for:', item.id);
    },
    onDragMove: (item, position) => {
      // Update node position in state
      setNodes(prev => prev.map(node => 
        node.id === item.id ? { ...node, x: position.x, y: position.y } : node
      ));
    },
    onDragEnd: (item, position) => {
      // Final position update
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

  const loadPedigreeForCat = (cat: CatData) => {
    // Clear existing nodes
    setNodes([]);
    
    // Add the main cat in the center
    const mainNode: CanvasNode = {
      cat,
      x: 300,
      y: 200,
      id: cat.id
    };
    setNodes([mainNode]);

    // Add parents if they exist
    const parents = catService.getParents(cat.id);
    const newNodes = [mainNode];

    if (parents.mother) {
      newNodes.push({
        cat: parents.mother,
        x: 100,
        y: 50,
        id: parents.mother.id
      });
    }

    if (parents.father) {
      newNodes.push({
        cat: parents.father,
        x: 500,
        y: 50,
        id: parents.father.id
      });
    }

    setNodes(newNodes);
  };

  const handleNodeMouseDown = (e: React.MouseEvent, node: CanvasNode) => {
    e.preventDefault();
    
    if (isConnecting) {
      handleConnectionClick(node.cat);
      return;
    }

    startDrag(e.currentTarget as HTMLElement, node.id, node.x, node.y, e.nativeEvent);
  };

  const handleConnectionClick = (cat: CatData) => {
    if (isConnecting && connectingFrom && connectingFrom.id !== cat.id && connectionMode) {
      // Validate: prevent self-parenting
      if (connectingFrom.id === cat.id) {
        toast({
          title: "Невалидна връзка",
          description: "Котка не може да бъде родител на себе си!",
          variant: "destructive"
        });
        cancelConnection();
        return;
      }

      // Validate gender - fathers must be male, mothers must be female
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

      // Validate connection - prevent circular relationships
      if (wouldCreateCircularRelationship(connectingFrom.id, cat.id)) {
        toast({
          title: "Невалидна връзка",
          description: "Не можете да създадете кръгова връзка в родословието!",
          variant: "destructive"
        });
        cancelConnection();
        return;
      }

      // Check if the same cat is already set as the other parent type
      const existingParents = catService.getParents(cat.id);
      const otherParentType = connectionMode === 'father' ? 'mother' : 'father';
      const otherParent = otherParentType === 'mother' ? existingParents.mother : existingParents.father;
      
      if (otherParent && otherParent.id === connectingFrom.id) {
        toast({
          title: "Невалидна връзка",
          description: `${connectingFrom.name} вече е ${otherParentType === 'father' ? 'баща' : 'майка'} на ${cat.name}. Котка не може да бъде и двата родителя!`,
          variant: "destructive"
        });
        cancelConnection();
        return;
      }

      // Validate age logic using birth dates instead of age strings
      const validateAgeLogic = (parent: CatData, child: CatData): boolean => {
        if (!parent.birthDate || !child.birthDate) return true; // Skip if no birth dates
        
        const parentBirth = new Date(parent.birthDate);
        const childBirth = new Date(child.birthDate);
        
        // Parent should be born before child
        if (parentBirth >= childBirth) {
          return false;
        }
        
        // Calculate age difference in months
        const ageMonths = (childBirth.getTime() - parentBirth.getTime()) / (1000 * 60 * 60 * 24 * 30.44);
        
        // Parent should be at least 6 months old when child is born (minimum breeding age)
        return ageMonths >= 6;
      };

      if (!validateAgeLogic(connectingFrom, cat)) {
        if (!confirm(`Възрастовата логика изглежда неправилна: ${connectingFrom.name} (${connectingFrom.birthDate}) → ${cat.name} (${cat.birthDate}). Продължете?`)) {
          return;
        }
      }

      // Check for potential inbreeding (parent and child share common ancestors)
      const checkInbreeding = (parent: CatData, child: CatData): boolean => {
        const parentAncestors = new Set<string>();
        const childAncestors = new Set<string>();
        
        const collectAncestors = (catId: string, ancestorSet: Set<string>, depth = 0): void => {
          if (depth > 3) return; // Limit to 3 generations to avoid performance issues
          
          const parents = catService.getParents(catId);
          if (parents.mother) {
            ancestorSet.add(parents.mother.id);
            collectAncestors(parents.mother.id, ancestorSet, depth + 1);
          }
          if (parents.father) {
            ancestorSet.add(parents.father.id);
            collectAncestors(parents.father.id, ancestorSet, depth + 1);
          }
        };
        
        collectAncestors(parent.id, parentAncestors);
        collectAncestors(child.id, childAncestors);
        
        // Check if they share any common ancestors
        for (const ancestor of parentAncestors) {
          if (childAncestors.has(ancestor)) {
            return true;
          }
        }
        return false;
      };

      if (checkInbreeding(connectingFrom, cat)) {
        if (!confirm(`⚠️ ПРЕДУПРЕЖДЕНИЕ: Възможно е кръвосмешение между ${connectingFrom.name} и ${cat.name} (споделят общи предци). Това може да доведе до генетични проблеми. Продължете?`)) {
          return;
        }
      }

      // Create connection
      catService.addConnection(connectingFrom.id, cat.id, connectionMode);
      toast({
        title: "Връзка създадена",
        description: `${connectingFrom.name} е свързан като ${connectionMode === 'father' ? 'баща' : 'майка'} на ${cat.name}`,
        variant: "default"
      });
      setIsConnecting(false);
      setConnectingFrom(null);
      setConnectionMode(null);
    } else if (!isConnecting) {
      // This shouldn't happen, but just in case
      setIsConnecting(false);
      setConnectingFrom(null);
      setConnectionMode(null);
    }
  };

  const wouldCreateCircularRelationship = (parentId: string, childId: string): boolean => {
    // Check if the child is already an ancestor of the parent (prevents A->B->A)
    const checkAncestor = (currentId: string, targetId: string, visited = new Set<string>()): boolean => {
      // Prevent infinite loops by tracking visited nodes
      if (visited.has(currentId)) return false;
      visited.add(currentId);

      const parents = catService.getParents(currentId);
      if (parents.mother?.id === targetId || parents.father?.id === targetId) {
        return true;
      }
      return (parents.mother && checkAncestor(parents.mother.id, targetId, visited)) ||
             (parents.father && checkAncestor(parents.father.id, targetId, visited));
    };

    // Check if the parent is already a descendant of the child (prevents A->B->C->A)
    const checkDescendant = (currentId: string, targetId: string, visited = new Set<string>()): boolean => {
      // Prevent infinite loops by tracking visited nodes
      if (visited.has(currentId)) return false;
      visited.add(currentId);

      const children = catService.getChildren(currentId);
      if (children.some(child => child.id === targetId)) {
        return true;
      }
      return children.some(child => checkDescendant(child.id, targetId, visited));
    };

    // Check both directions: is child an ancestor of parent OR is parent a descendant of child
    return checkAncestor(parentId, childId) || checkDescendant(childId, parentId);
  };

  const startConnection = (cat: CatData, type: 'father' | 'mother') => {
    setIsConnecting(true);
    setConnectingFrom(cat);
    setConnectionMode(type);
  };

  const handleCanvasMouseMove = (e: React.MouseEvent) => {
    if (isConnecting && canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      setCursorPosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };

  const cancelConnection = () => {
    setIsConnecting(false);
    setConnectingFrom(null);
    setConnectionMode(null);
  };

  const addCatToCanvas = (cat: CatData, position?: { x: number; y: number }) => {
    // Check if cat is already on canvas
    if (nodes.some(node => node.cat.id === cat.id)) {
      // Show visual feedback that cat is already on canvas
      const existingNode = nodes.find(node => node.cat.id === cat.id);
      if (existingNode) {
        // Briefly highlight the existing cat
        const element = document.querySelector(`[data-cat-id="${cat.id}"]`);
        if (element) {
          element.classList.add('animate-bounce');
          setTimeout(() => {
            element.classList.remove('animate-bounce');
          }, 1000);
        }
      }
      toast({
        title: "Котката вече е добавена",
        description: `${cat.name} вече е на canvas-а`,
        variant: "default"
      });
      return;
    }

    const newNode: CanvasNode = {
      cat,
      x: position?.x || Math.random() * 400 + 100,
      y: position?.y || Math.random() * 300 + 100,
      id: cat.id
    };

    setNodes(prev => [...prev, newNode]);
    toast({
      title: "Котка добавена",
      description: `${cat.name} е добавена на canvas-а`,
      variant: "default"
    });
  };

  const removeCatFromCanvas = (catId: string) => {
    const removedCat = nodes.find(node => node.cat.id === catId);
    
    // Clean up connection state if this cat was being used for connections
    if (isConnecting && connectingFrom?.id === catId) {
      cancelConnection();
    }
    
    setNodes(prev => prev.filter(node => node.cat.id !== catId));
    
    // Remove related connections (create array first to avoid mutation during iteration)
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

  const renderConnections = () => {
    const connectionElements = connections.map(conn => {
      const parentNode = nodes.find(n => n.cat.id === conn.parentId);
      const childNode = nodes.find(n => n.cat.id === conn.childId);
      
      if (!parentNode || !childNode) return null;

      const x1 = parentNode.x + 70; // Center of parent node
      const y1 = parentNode.y + 70;
      const x2 = childNode.x + 70; // Center of child node
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
            className="transition-all duration-200"
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
            style={{ pointerEvents: 'all' }}
            onClick={() => {
              catService.removeConnection(conn.id);
              toast({
                title: "Връзка премахната",
                description: "Родителската връзка е премахната",
                variant: "default"
              });
            }}
          />
          <text
            x={(x1 + x2) / 2}
            y={(y1 + y2) / 2 + 5}
            textAnchor="middle"
            fontSize="16"
            fill="red"
            className="cursor-pointer font-bold"
            style={{ pointerEvents: 'all' }}
            onClick={() => {
              catService.removeConnection(conn.id);
              toast({
                title: "Връзка премахната",
                description: "Родителската връзка е премахната",
                variant: "default"
              });
            }}
          >
            ×
          </text>
        </g>
      );
    });

    // Add connection preview arrow when connecting
    if (isConnecting && connectingFrom) {
      const sourceNode = nodes.find(n => n.cat.id === connectingFrom.id);
      if (sourceNode) {
        const x1 = sourceNode.x + 70;
        const y1 = sourceNode.y + 70;
        const x2 = cursorPosition.x;
        const y2 = cursorPosition.y;

        const angle = Math.atan2(y2 - y1, x2 - x1);
        const arrowSize = 15;
        
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
            <text
              x={x1 + (x2 - x1) * 0.3}
              y={y1 + (y2 - y1) * 0.3 - 10}
              textAnchor="middle"
              fontSize="12"
              fill={connectionMode === 'father' ? '#3b82f6' : '#ec4899'}
              className="font-medium animate-pulse"
            >
              {connectionMode === 'father' ? 'Баща' : 'Майка'}
            </text>
          </g>
        );
      }
    }

    return connectionElements;
  };

  // Auto-load pedigree when a cat is selected
  useEffect(() => {
    if (selectedCat) {
      loadPedigreeForCat(selectedCat);
    }
  }, [selectedCat]);

  // Expose canvas methods to parent
  useEffect(() => {
    onCanvasReady?.({ addCatToCanvas });
  }, [onCanvasReady, addCatToCanvas]);

  // Add keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isConnecting) {
        cancelConnection();
      }
      if (e.key === 'c' && e.ctrlKey && nodes.length > 0) {
        e.preventDefault();
        if (confirm('Сигурни ли сте, че искате да изчистите цялото родословие?')) {
          // Cancel any active connections
          if (isConnecting) {
            cancelConnection();
          }
          
          setNodes([]);
          
          // Bulk remove connections
          const connectionsToRemove = [...connections];
          connectionsToRemove.forEach(conn => {
            catService.removeConnection(conn.id);
          });
        }
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [isConnecting, nodes.length, connections]);

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-white">
        <h2 className="font-playfair text-xl font-semibold">Pedigree Canvas</h2>
        <div className="flex gap-2">
          {isConnecting && (
            <Button
              onClick={cancelConnection}
              className="px-3 py-1 bg-red-600 text-white text-sm hover:bg-red-700"
            >
              ✕ Отказ връзка
            </Button>
          )}
        </div>
      </div>

      {/* Instructions */}
      <div className="p-4 bg-gray-50 text-sm text-gray-600 border-b">
        <p>
          {isConnecting 
            ? `🔗 Свързване от ${connectingFrom?.name} като ${connectionMode === 'father' ? 'баща' : 'майка'} - кликнете върху дете`
            : '💡 Инструкции: Влачете котки от лявата част → Използвайте ♂/♀ иконите за свързване → Влачете за преместване'
          }
        </p>
      </div>

      {/* Canvas */}
      <div 
        ref={canvasRef}
        className="flex-1 relative bg-background overflow-hidden canvas-grid"
        style={{ minHeight: '600px' }}
        data-drop-zone="canvas"
        onMouseMove={handleCanvasMouseMove}
      >
        {/* Action Buttons - Fixed Position */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-30 flex gap-2">
          <Button
            onClick={() => {
              const pedigreeData = {
                nodes: nodes.map(node => ({
                  ...node.cat,
                  x: node.x,
                  y: node.y
                })),
                connections: connections
              };
              console.log('Pedigree saved:', pedigreeData);
              // Here you would typically save to a database
              toast({
                title: "Родословие запазено",
                description: `Запазени са ${nodes.length} котки и ${connections.length} връзки`,
                variant: "default"
              });
            }}
            className="bg-green-600 text-white hover:bg-green-700 shadow-lg"
            disabled={nodes.length === 0}
          >
            💾 Запази родословие
          </Button>
          
          <Button
            onClick={() => {
              if (confirm('Сигурни ли сте, че искате да изчистите цялото родословие?')) {
                // Cancel any active connections
                if (isConnecting) {
                  cancelConnection();
                }
                
                setNodes([]);
                
                // Bulk remove connections to avoid multiple notifications
                const connectionsToRemove = [...connections];
                connectionsToRemove.forEach(conn => {
                  catService.removeConnection(conn.id);
                });
                
                toast({
                  title: "Родословие изчистено",
                  description: "Всички котки и връзки са премахнати",
                  variant: "default"
                });
              }
            }}
            variant="outline"
            className="border-red-500 text-red-600 hover:bg-red-50 bg-white shadow-lg"
            disabled={nodes.length === 0}
          >
            🗑️ Изчисти родословие
          </Button>
        </div>
        {/* SVG for connections */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
          {renderConnections()}
        </svg>

        {/* Cat nodes */}
        {nodes.map((node) => (
          <div
            key={node.id}
            data-cat-id={node.cat.id}
            className={`absolute bg-white rounded-lg shadow-lg border-2 transition-all duration-200 z-20 canvas-node ${
              isDragging ? 'cursor-grabbing' : isConnecting && connectingFrom?.id !== node.id ? 'cursor-pointer' : 'cursor-grab'
            } ${
              hoveredNode === node.id ? 'shadow-xl scale-105' : ''
            } ${
              connectingFrom?.id === node.id ? 'ring-4 ring-blue-500 ring-opacity-75 bg-blue-50' : 'border-gray-200'
            } ${
              isConnecting && connectingFrom?.id !== node.id ? 'hover:ring-2 hover:ring-green-400 hover:bg-green-50' : ''
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
                <img
                  src={node.cat.image || '/placeholder.jpg'}
                  alt={node.cat.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="mt-1 text-center">
                <p className="text-xs font-semibold truncate">{node.cat.name}</p>
                <p className="text-xs text-gray-600">
                  {node.cat.gender === 'male' ? '♂' : '♀'} {node.cat.age}
                </p>
              </div>
            </div>

            {/* Connection Icons */}
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
              {isConnecting && connectingFrom?.id === node.id && (
                <div className="w-7 h-7 bg-yellow-500 text-white rounded-full text-sm flex items-center justify-center animate-pulse shadow-lg">
                  🔗
                </div>
              )}
            </div>
            
            {/* Remove button */}
            <button
              className="absolute -top-2 -left-2 w-5 h-5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center hover:bg-red-600 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                removeCatFromCanvas(node.cat.id);
              }}
              title="Премахни от canvas"
            >
              ×
            </button>
          </div>
        ))}

        {/* Empty state */}
        {nodes.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center text-gray-500">
            <div className="text-center p-8 bg-white rounded-lg shadow-lg border-2 border-dashed border-gray-300">
              <p className="text-2xl mb-3">📊</p>
              <p className="text-lg mb-2 font-semibold">Празен canvas</p>
              <p className="text-sm mb-1">👆 <strong>Влачете котки</strong> от лявата част</p>
              <p className="text-sm mb-1">🎯 Или <strong>изберете котка</strong> за автоматично зареждане</p>
              <p className="text-xs text-gray-400 mt-3">Родословието ще се покаже автоматично</p>
            </div>
          </div>
        )}
        
        {/* Stats - Fixed Position */}
        <div className="absolute top-4 right-4 z-30 bg-white bg-opacity-90 px-3 py-2 rounded-lg shadow-lg text-sm text-gray-700">
          {nodes.length} котки • {connections.length} връзки
        </div>
      </div>
    </div>
  );
};

export default PedigreeCanvas;