import { useState, useEffect } from 'react';

export function useViewportHeight() {
  const [height, setHeight] = useState(window.innerHeight);

  useEffect(() => {
    const viewport = window.visualViewport;

    function handleResize() {
      if (viewport) {
        setHeight(viewport.height);
      } else {
        setHeight(window.innerHeight);
      }
    }

    // Listen to both viewport and window resize events
    viewport?.addEventListener('resize', handleResize);
    window.addEventListener('resize', handleResize);

    return () => {
      viewport?.removeEventListener('resize', handleResize);
      window.addEventListener('resize', handleResize);
    };
  }, []);

  return height;
}