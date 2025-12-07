import { useState, useRef, useEffect, useCallback } from "react";

export const useResizable = (initialHeightPercent: number = 60) => {
  const [heightPercent, setHeightPercent] = useState(initialHeightPercent);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const startDrag = useCallback(() => {
    isDragging.current = true;
    document.body.style.cursor = "row-resize";
  }, []);

  const stopDrag = useCallback(() => {
    isDragging.current = false;
    document.body.style.cursor = "default";
  }, []);

  const onDrag = useCallback((e: MouseEvent) => {
    if (!isDragging.current || !containerRef.current) return;

    // Use requestAnimationFrame for smooth 60fps UI updates
    requestAnimationFrame(() => {
      const containerRect = containerRef.current!.getBoundingClientRect();
      let newHeight =
        ((e.clientY - containerRect.top) / containerRect.height) * 100;

      // Constraints (10% to 90%)
      if (newHeight < 10) newHeight = 10;
      if (newHeight > 90) newHeight = 90;

      setHeightPercent(newHeight);
    });
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", onDrag);
    window.addEventListener("mouseup", stopDrag);
    return () => {
      window.removeEventListener("mousemove", onDrag);
      window.removeEventListener("mouseup", stopDrag);
    };
  }, [onDrag, stopDrag]);

  return { heightPercent, containerRef, startDrag, isDragging };
};