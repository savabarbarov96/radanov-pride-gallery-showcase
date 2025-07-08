import { useState, useRef, useCallback, useEffect } from 'react';

interface DragState {
  isDragging: boolean;
  dragOffset: { x: number; y: number };
  currentPosition: { x: number; y: number };
  startPosition: { x: number; y: number };
}

interface DragItem {
  id: string;
  element: HTMLElement;
  initialX: number;
  initialY: number;
}

interface UseDragAndDropOptions {
  onDragStart?: (item: DragItem, event: MouseEvent) => void;
  onDragMove?: (item: DragItem, position: { x: number; y: number }, event: MouseEvent) => void;
  onDragEnd?: (item: DragItem, position: { x: number; y: number }, event: MouseEvent) => void;
  constrainToParent?: boolean;
  snapToGrid?: { x: number; y: number };
}

export const useDragAndDrop = (options: UseDragAndDropOptions = {}) => {
  const [dragState, setDragState] = useState<DragState>({
    isDragging: false,
    dragOffset: { x: 0, y: 0 },
    currentPosition: { x: 0, y: 0 },
    startPosition: { x: 0, y: 0 }
  });

  const dragItemRef = useRef<DragItem | null>(null);
  const containerRef = useRef<HTMLElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  const constrainPosition = useCallback((x: number, y: number, element: HTMLElement) => {
    let constrainedX = x;
    let constrainedY = y;

    if (options.constrainToParent && containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const elementRect = element.getBoundingClientRect();
      
      constrainedX = Math.max(0, Math.min(x, containerRect.width - elementRect.width));
      constrainedY = Math.max(0, Math.min(y, containerRect.height - elementRect.height));
    }

    if (options.snapToGrid) {
      constrainedX = Math.round(constrainedX / options.snapToGrid.x) * options.snapToGrid.x;
      constrainedY = Math.round(constrainedY / options.snapToGrid.y) * options.snapToGrid.y;
    }

    return { x: constrainedX, y: constrainedY };
  }, [options.constrainToParent, options.snapToGrid]);

  const updatePosition = useCallback((clientX: number, clientY: number) => {
    if (!dragItemRef.current || !containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const newX = clientX - containerRect.left - dragState.dragOffset.x;
    const newY = clientY - containerRect.top - dragState.dragOffset.y;

    const constrainedPosition = constrainPosition(newX, newY, dragItemRef.current.element);

    setDragState(prev => ({
      ...prev,
      currentPosition: constrainedPosition
    }));

    // Apply position to element with proper positioning
    dragItemRef.current.element.style.position = 'absolute';
    dragItemRef.current.element.style.left = `${constrainedPosition.x}px`;
    dragItemRef.current.element.style.top = `${constrainedPosition.y}px`;
    dragItemRef.current.element.style.zIndex = '1000';
    
    // Add dragging class for visual feedback
    dragItemRef.current.element.classList.add('dragging');

    options.onDragMove?.(dragItemRef.current, constrainedPosition, {
      clientX,
      clientY
    } as MouseEvent);
  }, [dragState.dragOffset, constrainPosition, options]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!dragState.isDragging || !dragItemRef.current) return;

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    animationFrameRef.current = requestAnimationFrame(() => {
      updatePosition(e.clientX, e.clientY);
    });
  }, [dragState.isDragging, updatePosition]);

  const handleMouseUp = useCallback((e: MouseEvent) => {
    if (!dragState.isDragging || !dragItemRef.current) return;

    const item = dragItemRef.current;
    
    // Remove dragging class and reset cursor
    item.element.classList.remove('dragging');
    item.element.style.cursor = '';
    
    // Clean up animation frame
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }

    setDragState(prev => ({
      ...prev,
      isDragging: false
    }));

    options.onDragEnd?.(item, dragState.currentPosition, e);
    dragItemRef.current = null;
  }, [dragState.isDragging, dragState.currentPosition, options]);

  useEffect(() => {
    if (dragState.isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'grabbing';
      document.body.style.userSelect = 'none';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }, [dragState.isDragging, handleMouseMove, handleMouseUp]);

  const startDrag = useCallback((
    element: HTMLElement,
    id: string,
    initialX: number,
    initialY: number,
    event: MouseEvent
  ) => {
    if (!containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    
    // Calculate drag offset based on where the mouse clicked within the element
    const dragOffset = {
      x: event.clientX - containerRect.left - initialX,
      y: event.clientY - containerRect.top - initialY
    };

    const startPosition = {
      x: initialX,
      y: initialY
    };

    dragItemRef.current = {
      id,
      element,
      initialX,
      initialY
    };

    setDragState({
      isDragging: true,
      dragOffset,
      currentPosition: startPosition,
      startPosition
    });

    // Add grabbing cursor immediately
    element.style.cursor = 'grabbing';
    
    options.onDragStart?.(dragItemRef.current, event);
  }, [options]);

  const setContainer = useCallback((element: HTMLElement | null) => {
    containerRef.current = element;
  }, []);

  return {
    dragState,
    startDrag,
    setContainer,
    isDragging: dragState.isDragging
  };
};