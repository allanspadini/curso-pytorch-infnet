import React, { useEffect, useRef } from 'react';
import katex from 'katex';

export default function MathView({ math, block = false }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      katex.render(math, containerRef.current, {
        displayMode: block,
        throwOnError: false,
      });
    }
  }, [math, block]);

  return <span ref={containerRef} className={block ? 'katex-block' : 'katex-inline'} />;
}
