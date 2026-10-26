import React, { useEffect, useRef } from 'react';
import katex from 'katex';

export default function MathView({ math, displayMode = false }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current && math) {
      try {
        katex.render(math, containerRef.current, {
          displayMode,
          throwOnError: false
        });
      } catch (err) {
        console.error("KaTeX Error:", err);
      }
    }
  }, [math, displayMode]);

  return <span ref={containerRef} />;
}
