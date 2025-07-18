import { useState } from 'react';
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useDragFromGallery } from '@/hooks/useDragFromGallery';
import CatImageWithFallback from '@/components/CatImageWithFallback';

interface CatGalleryItemProps {
  cat: any;
  isSelected: boolean;
  onSelect: (cat: any) => void;
  onEdit: (cat: any) => void;
  onAddToCanvas?: (cat: any) => void;
  onDropToCanvas?: (cat: any, position: { x: number; y: number }) => void;
  showDragHint?: boolean;
}

const CatGalleryItem = ({ 
  cat, 
  isSelected, 
  onSelect, 
  onEdit, 
  onAddToCanvas, 
  onDropToCanvas,
  showDragHint 
}: CatGalleryItemProps) => {
  const toggleCatDisplay = useMutation(api.cats.toggleCatDisplay);
  const [isDragInProgress, setIsDragInProgress] = useState(false);

  const { startDrag, isDragging } = useDragFromGallery({
    onDrop: (draggedCat, position) => {
      onDropToCanvas?.(draggedCat, position);
      setIsDragInProgress(false);
    },
    onDragEnd: () => {
      setIsDragInProgress(false);
    }
  });

  const handleClick = () => {
    if (!isDragInProgress) {
      console.log('CatGalleryItem: Selecting cat:', cat.name);
      onSelect(cat);
    }
  };

  const handleDragMouseDown = (e: React.MouseEvent) => {
    if (e.button === 0 && onDropToCanvas) {
      console.log('CatGalleryItem: Starting drag for cat:', cat.name);
      setIsDragInProgress(true);
      e.preventDefault();
      e.stopPropagation();
      startDrag(cat, e.nativeEvent);
    }
  };

  const getParentInfo = () => {
    // TODO: Implement with Convex queries for parents and children
    return { 
      parents: { mother: null, father: null }, 
      children: [] 
    };
  };

  const { parents, children } = getParentInfo();

  return (
    <Card
      className={`transition-all hover:shadow-md ${
        isSelected ? 'ring-2 ring-blue-500 shadow-md' : ''
      } ${isDragging ? 'opacity-50' : ''}`}
    >
      <CardContent className="p-3">
        <div className="flex gap-3">
          {/* Cat Image with drag handle */}
          <div className="relative">
            <div 
              className={`w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 ${
                onDropToCanvas ? 'cursor-grab active:cursor-grabbing' : 'cursor-pointer'
              }`}
              onClick={!onDropToCanvas ? handleClick : undefined}
              onMouseDown={onDropToCanvas ? handleDragMouseDown : undefined}
              title={onDropToCanvas ? 'Влачете за добавяне на canvas' : 'Кликнете за избор'}
            >
              <CatImageWithFallback
                src={cat.image}
                alt={cat.name}
                className="w-full h-full pointer-events-none"
              />
            </div>
            {onDropToCanvas && showDragHint && (
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-xs text-white">⤴</span>
              </div>
            )}
          </div>

          {/* Cat Info - clickable but not draggable */}
          <div className="flex-1 min-w-0 cursor-pointer" onClick={handleClick}>
            <div className="flex items-start justify-between">
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-gray-900 truncate">{cat.name}</h3>
                <p className="text-sm text-gray-600 truncate">{cat.subtitle}</p>
              </div>
              
              <div className="flex flex-col items-end gap-1 ml-2">
                <Badge variant={cat.isDisplayed ? "default" : "secondary"} className="text-xs">
                  {cat.isDisplayed ? "Показана" : "Скрита"}
                </Badge>
                <div className="flex gap-1">
                  <Badge variant="outline" className="text-xs">
                    {cat.gender === 'male' ? '♂' : '♀'}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {cat.age}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="mt-2 flex flex-wrap gap-1">
              <Badge variant="outline" className="text-xs">{cat.color}</Badge>
              <Badge variant="outline" className="text-xs">{cat.status}</Badge>
              {cat.price && <Badge variant="outline" className="text-xs">{cat.price}</Badge>}
            </div>

            {/* Parent/Children Info */}
            <div className="mt-2 text-xs text-gray-500">
              {parents.mother && <span>Майка: {parents.mother.name} </span>}
              {parents.father && <span>Баща: {parents.father.name} </span>}
              {children.length > 0 && <span>Деца: {children.length}</span>}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-3 flex gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={(e) => {
              e.stopPropagation();
              onEdit(cat);
            }}
            className="flex-1"
          >
            ✏️ Редактирай
          </Button>
          
          <Button
            size="sm"
            variant="outline"
            onClick={(e) => {
              e.stopPropagation();
              toggleCatDisplay({ id: cat._id });
            }}
            className="flex-1"
          >
            {cat.isDisplayed ? '👁️ Скрий' : '👁️‍🗨️ Покажи'}
          </Button>

          {onAddToCanvas && (
            <Button
              size="sm"
              variant="outline"
              onClick={(e) => {
                e.stopPropagation();
                onAddToCanvas(cat);
              }}
              className="flex-1"
              title="Добави на canvas"
            >
              ➕ Canvas
            </Button>
          )}

          {onDropToCanvas && (
            <Button
              size="sm"
              variant="outline"
              onDoubleClick={(e) => {
                e.stopPropagation();
                onDropToCanvas(cat, { x: 100, y: 100 });
              }}
              className="flex-1"
              title="Двойно кликнете за добавяне на canvas"
            >
              🎯 Drop
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CatGalleryItem;