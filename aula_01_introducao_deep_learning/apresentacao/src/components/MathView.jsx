import React, { useEffect, useRef } from 'react';
import katex from 'katex';

export default function MathView({ math, displayMode = true, style, className }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current && math) {
      try {
        katex.render(math, containerRef.current, {
          throwOnError: false,
          displayMode: displayMode
        });
      } catch (err) {
        console.error('KaTeX rendering error:', err);
        containerRef.current.innerText = math;
      }
    }
  }, [math, displayMode]);

  return <div ref={containerRef} className={className} style={{ display: 'inline-block', ...style }} />;
}
