import { useState, useRef, useEffect, useCallback } from "react";

type Direction = "horizontal" | "vertical";

export const useResizable = (
  initialSize: number = 50,
  direction: Direction = "horizontal",
) => {
  const [size, setSize] = useState(initialSize);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const startDrag = useCallback(() => {
    isDragging.current = true;
    document.body.style.cursor =
      direction === "horizontal" ? "col-resize" : "row-resize";
    document.body.style.userSelect = "none";
  }, [direction]);

  const stopDrag = useCallback(() => {
    isDragging.current = false;
    document.body.style.cursor = "default";
    document.body.style.userSelect = "auto";
  }, []);

  const onDrag = useCallback(
    (e: MouseEvent) => {
      if (!isDragging.current || !containerRef.current) return;

      requestAnimationFrame(() => {
        const containerRect = containerRef.current!.getBoundingClientRect();
        let newSize = 0;

        if (direction === "horizontal") {
          newSize =
            ((e.clientX - containerRect.left) / containerRect.width) * 100;
        } else {
          newSize =
            ((e.clientY - containerRect.top) / containerRect.height) * 100;
        }

        // Constraints
        if (newSize < 10) newSize = 10;
        if (newSize > 90) newSize = 90;

        setSize(newSize);
      });
    },
    [direction],
  );

  useEffect(() => {
    window.addEventListener("mousemove", onDrag);
    window.addEventListener("mouseup", stopDrag);
    return () => {
      window.removeEventListener("mousemove", onDrag);
      window.removeEventListener("mouseup", stopDrag);
    };
  }, [onDrag, stopDrag]);

  return { size, containerRef, startDrag, isDragging };
};
