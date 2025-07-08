import { useState, useCallback, useRef, useEffect } from 'react';
import { CatData } from '@/services/catService';

interface DragFromGalleryState {
  isDragging: boolean;
  draggedCat: CatData | null;
  dragOffset: { x: number; y: number };
  currentPosition: { x: number; y: number };
}

interface UseDragFromGalleryOptions {
  onDragStart?: (cat: CatData) => void;
  onDragMove?: (cat: CatData, position: { x: number; y: number }) => void;
  onDragEnd?: (cat: CatData, position: { x: number; y: number }) => void;
  onDrop?: (cat: CatData, position: { x: number; y: number }) => void;
}

export const useDragFromGallery = (options: UseDragFromGalleryOptions = {}) => {
  const [dragState, setDragState] = useState<DragFromGalleryState>({
    isDragging: false,
    draggedCat: null,
    dragOffset: { x: 0, y: 0 },
    currentPosition: { x: 0, y: 0 }
  });

  const dragPreviewRef = useRef<HTMLDivElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  const updateDragPreview = useCallback((clientX: number, clientY: number) => {
    if (!dragPreviewRef.current) return;

    // Position the preview centered on the cursor
    const newX = clientX - dragState.dragOffset.x;
    const newY = clientY - dragState.dragOffset.y;

    setDragState(prev => ({
      ...prev,
      currentPosition: { x: newX, y: newY }
    }));

    dragPreviewRef.current.style.left = `${newX}px`;
    dragPreviewRef.current.style.top = `${newY}px`;

    options.onDragMove?.(dragState.draggedCat!, { x: newX, y: newY });
  }, [dragState.dragOffset, dragState.draggedCat, options]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!dragState.isDragging || !dragState.draggedCat) return;

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    animationFrameRef.current = requestAnimationFrame(() => {
      updateDragPreview(e.clientX, e.clientY);
    });
  }, [dragState.isDragging, dragState.draggedCat, updateDragPreview]);

  const handleMouseUp = useCallback((e: MouseEvent) => {
    if (!dragState.isDragging || !dragState.draggedCat) return;

    // Clean up animation frame
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }

    // Remove drag preview
    if (dragPreviewRef.current) {
      document.body.removeChild(dragPreviewRef.current);
      dragPreviewRef.current = null;
    }

    // Check if we're dropping on a valid drop zone
    const dropZone = document.elementFromPoint(e.clientX, e.clientY);
    const canvas = dropZone?.closest('[data-drop-zone="canvas"]');
    
    if (canvas) {
      const canvasRect = canvas.getBoundingClientRect();
      const dropPosition = {
        x: e.clientX - canvasRect.left - 70, // Center the cat node
        y: e.clientY - canvasRect.top - 70
      };
      options.onDrop?.(dragState.draggedCat, dropPosition);
    }

    options.onDragEnd?.(dragState.draggedCat, dragState.currentPosition);

    setDragState({
      isDragging: false,
      draggedCat: null,
      dragOffset: { x: 0, y: 0 },
      currentPosition: { x: 0, y: 0 }
    });
  }, [dragState.isDragging, dragState.draggedCat, dragState.currentPosition, options]);

  useEffect(() => {
    if (dragState.isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'grabbing';
      document.body.style.userSelect = 'none';
      
      // Add visual feedback to drop zones
      const dropZones = document.querySelectorAll('[data-drop-zone="canvas"]');
      dropZones.forEach(zone => {
        zone.classList.add('canvas-drop-active');
      });
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
      
      // Remove visual feedback from drop zones
      const dropZones = document.querySelectorAll('[data-drop-zone="canvas"]');
      dropZones.forEach(zone => {
        zone.classList.remove('canvas-drop-active');
      });
    };
  }, [dragState.isDragging, handleMouseMove, handleMouseUp]);

  const startDrag = useCallback((cat: CatData, event: MouseEvent) => {
    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    
    // Calculate offset from cursor to center of preview (60px = half of 120px preview size)
    const dragOffset = {
      x: 60, // Half the preview width to center it on cursor
      y: 60  // Half the preview height to center it on cursor
    };

    // Start position should be cursor position minus offset to center preview
    const startPosition = {
      x: event.clientX - dragOffset.x,
      y: event.clientY - dragOffset.y
    };

    // Create drag preview
    const preview = document.createElement('div');
    preview.className = 'fixed z-[9999] pointer-events-none bg-white rounded-lg shadow-2xl border-2 border-blue-500 opacity-80 transform rotate-3';
    preview.style.width = '120px';
    preview.style.height = '120px';
    preview.style.left = `${startPosition.x}px`;
    preview.style.top = `${startPosition.y}px`;
    
    preview.innerHTML = `
      <div class="w-full h-full p-2 flex flex-col">
        <div class="flex-1 bg-gray-100 rounded overflow-hidden">
          <img src="${cat.image}" alt="${cat.name}" class="w-full h-full object-cover" />
        </div>
        <div class="mt-1 text-center">
          <p class="text-xs font-semibold truncate">${cat.name}</p>
          <p class="text-xs text-gray-600">${cat.gender === 'male' ? '♂' : '♀'}</p>
        </div>
      </div>
    `;

    document.body.appendChild(preview);
    dragPreviewRef.current = preview;

    setDragState({
      isDragging: true,
      draggedCat: cat,
      dragOffset,
      currentPosition: startPosition
    });

    options.onDragStart?.(cat);
  }, [options]);

  return {
    dragState,
    startDrag,
    isDragging: dragState.isDragging,
    draggedCat: dragState.draggedCat
  };
};