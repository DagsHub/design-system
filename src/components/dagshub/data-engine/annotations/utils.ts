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

export function useImageDimensions(myRef: React.RefObject<HTMLImageElement>) {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [ratio, setRatio] = useState(1);

  useEffect(() => {
    const getRatio = () => {
      if (myRef.current) {
        if (myRef.current.naturalHeight === 0) {
          return 1;
        }
        if (myRef.current.naturalWidth === 0) {
          return 1;
        }
        return myRef.current.naturalWidth / myRef.current.naturalHeight;
      }
      return 1;
    };

    const handleResize = () => {
      debounce(() => {
        setRatio(getRatio());
      }, 200)();
    };

    myRef.current?.addEventListener('resize', handleResize);
    myRef.current?.addEventListener('load', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [myRef]);

  useEffect(() => {
    const getDimensions = () => {
      // const isLandscape = ratio > 1;
      // if (isLandscape) {
      //   debugger;
      //   return {
      //     width: (myRef.current?.offsetHeight || 0) * ratio,
      //     height: myRef.current?.offsetHeight,
      //   }
      // } else {
      //   return {
      //     width: (myRef.current?.offsetHeight || 0) * ratio,
      //     height: myRef.current?.offsetHeight || 0
      //   }
      // }
      return {
        width: (myRef.current?.offsetHeight || 0) * ratio,
        height: myRef.current?.offsetHeight || 0
      };
      // return {
      //   width: myRef.current?.offsetWidth || 0,
      //   height: myRef.current?.offsetHeight || 0
      // }
    };

    const handleResize = () => {
      debounce(() => {
        setDimensions(getDimensions());
      }, 200)();
    };

    if (myRef.current) {
      setDimensions(getDimensions());
    }
    myRef.current?.addEventListener('resize', handleResize);
    myRef.current?.addEventListener('load', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [myRef, ratio]);

  return [dimensions.width, dimensions.height];
}

export function useContainerDimensions(myRef: React.RefObject<HTMLDivElement>) {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  useEffect(() => {
    const getDimensions = () => ({
      width: myRef.current?.offsetWidth || 0,
      height: myRef.current?.offsetHeight || 0
    });

    const handleResize = () => {
      debounce(() => {
        setDimensions(getDimensions());
      }, 200)();
    };

    if (myRef.current) {
      setDimensions(getDimensions());
    }
    myRef.current?.addEventListener('resize', handleResize);
    myRef.current?.addEventListener('load', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [myRef]);

  return [dimensions.width, dimensions.height];
}
