"use client";

import React, { useEffect, useState, useRef } from "react";

export const InteractiveBackground: React.FC = () => {
  const [dimensions, setDimensions] = useState({ columns: 0, rows: 0 });
  const glowRef = useRef<HTMLDivElement>(null);
  const triangleBase = 48; // px (equivalent to 3rem)

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      // Calculate columns and rows based on triangle math
      const columns = Math.ceil(width / (triangleBase * 2)) + 1;
      const rows = Math.ceil(height / (triangleBase * 1.733)) + 1;

      setDimensions({ columns, rows });
    };

    handleResize();
    window.onresize = handleResize;

    const handleMouseMove = (event: MouseEvent) => {
      if (glowRef.current) {
        // Use clientX and clientY because the container is position: fixed relative to viewport.
        // This keeps the glow aligned with the cursor even when the page is scrolled.
        glowRef.current.style.top = `${event.clientY}px`;
        glowRef.current.style.left = `${event.clientX}px`;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.onresize = null;
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const triangles: React.ReactNode[] = [];

  for (let r = 0; r < dimensions.rows; r++) {
    for (let c = 0; c < dimensions.columns; c++) {
      const isOffset = r % 2 === 0;
      triangles.push(
        <div
          key={`${r}-${c}`}
          className={`triangle-set ${isOffset ? "triangle-set--offset" : ""}`}
        />
      );
    }
  }

  return (
    <div className="interactive-bg-hero">
      <div
        ref={glowRef}
        id="glow"
        style={{ left: "-9999px", top: "-9999px" }}
      />
      <div
        className="triangle-container"
        style={{
          // Set custom property dynamically for CSS grid column repeating
          gridTemplateColumns: `repeat(${dimensions.columns}, calc(var(--triangle-base) * 2 + var(--gap)))`,
        } as React.CSSProperties}
      >
        {triangles}
      </div>
      <h1 className="interactive-bg-text">Move your cursor around!</h1>
    </div>
  );
};
