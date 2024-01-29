// Debounce function
import React, { useEffect, useState } from 'react';

const debounce = (fn: Function, delay: number) => {
  let timeoutId = 0;
  return function (...args: any[]) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = window.setTimeout(() => {
      fn(...args);
    }, delay);
  };
};

export function useContainerDimensions(myRef: React.RefObject<HTMLDivElement>) {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  useEffect(() => {
    const getDimensions = () => ({
      width: myRef.current?.offsetWidth || 0,
      height: myRef.current?.offsetHeight || 0,
    });

    const handleResize = () => {
      debounce(() => {
        setDimensions(getDimensions());
      }, 200)();
    };

    if (myRef.current) {
      setDimensions(getDimensions());
    }
    myRef.current?.addEventListener('load', handleResize);
    const observer = new ResizeObserver(handleResize);
    observer.observe(myRef.current as Element);
    return () => {
      observer.disconnect();
    };
  }, [myRef]);

  return [dimensions.width, dimensions.height];
}
