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

  // Cleanup function to ensure proper state reset
  const cleanup = useCallback(() => {
    console.log('Cleaning up drag state');
    
    // Clean up animation frame
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }

    // Remove drag preview
    if (dragPreviewRef.current) {
      try {
        document.body.removeChild(dragPreviewRef.current);
      } catch (e) {
        console.warn('Failed to remove drag preview:', e);
      }
      dragPreviewRef.current = null;
    }

    // Reset drag state
    setDragState({
      isDragging: false,
      draggedCat: null,
      dragOffset: { x: 0, y: 0 },
      currentPosition: { x: 0, y: 0 }
    });

    // Reset body styles
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
    
    // Clean up drop zone classes
    const dropZones = document.querySelectorAll('[data-drop-zone="canvas"]');
    dropZones.forEach(zone => zone.classList.remove('canvas-drop-active'));
  }, []);

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
    if (!dragState.isDragging || !dragState.draggedCat) {
      console.warn('Mouse move without proper drag state', { isDragging: dragState.isDragging, draggedCat: dragState.draggedCat?.name });
      return;
    }

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    animationFrameRef.current = requestAnimationFrame(() => {
      updateDragPreview(e.clientX, e.clientY);
    });
  }, [dragState.isDragging, dragState.draggedCat, updateDragPreview]);

  const handleMouseUp = useCallback((e: MouseEvent) => {
    console.log('Mouse up event', { isDragging: dragState.isDragging, draggedCat: dragState.draggedCat?.name });
    
    if (!dragState.isDragging || !dragState.draggedCat) {
      cleanup();
      return;
    }

    const draggedCat = dragState.draggedCat;
    const currentPos = dragState.currentPosition;

    // Check if we're dropping on a valid drop zone
    const dropZone = document.elementFromPoint(e.clientX, e.clientY);
    const canvas = dropZone?.closest('[data-drop-zone="canvas"]');
    
    if (canvas) {
      const canvasRect = canvas.getBoundingClientRect();
      const dropPosition = {
        x: e.clientX - canvasRect.left - 70, // Center the cat node
        y: e.clientY - canvasRect.top - 70
      };
      console.log('=== DROPPING CAT ===');
      console.log('Cat being dropped:', draggedCat.name, 'ID:', draggedCat.id, '_id:', draggedCat._id);
      console.log('Drop position:', dropPosition);
      options.onDrop?.(draggedCat, dropPosition);
    }

    options.onDragEnd?.(draggedCat, currentPos);
    cleanup();
  }, [dragState.isDragging, dragState.draggedCat, dragState.currentPosition, options, cleanup]);

  useEffect(() => {
    const cancelDragOnEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && dragState.isDragging) {
        console.log('Canceling drag with Escape key');
        cleanup();
      }
    };

    if (dragState.isDragging) {
      console.log('Adding global drag listeners for cat:', dragState.draggedCat?.name);
      document.addEventListener('mousemove', handleMouseMove, { passive: false });
      document.addEventListener('mouseup', handleMouseUp, { passive: false });
      document.addEventListener('keydown', cancelDragOnEscape);
      document.body.style.cursor = 'grabbing';
      document.body.style.userSelect = 'none';
      
      const dropZones = document.querySelectorAll('[data-drop-zone="canvas"]');
      dropZones.forEach(zone => zone.classList.add('canvas-drop-active'));
    }

    return () => {
      console.log('Removing global drag listeners');
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('keydown', cancelDragOnEscape);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
      
      const dropZones = document.querySelectorAll('[data-drop-zone="canvas"]');
      dropZones.forEach(zone => zone.classList.remove('canvas-drop-active'));
    };
  }, [dragState.isDragging, handleMouseMove, handleMouseUp, dragState.draggedCat, cleanup]);

  const startDrag = useCallback((cat: CatData, event: MouseEvent) => {
    if (dragState.isDragging) {
      console.warn('Attempted to start drag while already dragging', dragState.draggedCat?.name);
      return;
    }

    console.log('=== STARTING DRAG ===');
    console.log('Cat to drag:', cat.name, 'ID:', cat.id, '_id:', cat._id);
    console.log('Event target:', event.target);
    
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

    // Create drag preview with fallback image
    const preview = document.createElement('div');
    preview.className = 'fixed z-[9999] pointer-events-none bg-white rounded-lg shadow-2xl border-2 border-blue-500 opacity-80 transform rotate-3';
    preview.style.width = '120px';
    preview.style.height = '120px';
    preview.style.left = `${startPosition.x}px`;
    preview.style.top = `${startPosition.y}px`;
    
    // Use fallback image if no image available
    const imageHtml = cat.image 
      ? `<img src="${cat.image}" alt="${cat.name}" class="w-full h-full object-cover" />`
      : `<div class="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
           <svg class="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
             <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
           </svg>
         </div>`;
    
    preview.innerHTML = `
      <div class="w-full h-full p-2 flex flex-col">
        <div class="flex-1 bg-gray-100 rounded overflow-hidden">
          ${imageHtml}
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
  }, [options, dragState.isDragging, dragState.draggedCat]);

  // Cleanup on component unmount
  useEffect(() => {
    return () => {
      console.log('useDragFromGallery unmounting, cleaning up');
      cleanup();
    };
  }, [cleanup]);

  return {
    dragState,
    startDrag,
    isDragging: dragState.isDragging,
    draggedCat: dragState.draggedCat
  };
};