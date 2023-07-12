import { useCallback, useRef } from 'react';

interface UseDoubleClickInterface {
  doubleClick: (e: any) => void;
  click: (e: any) => void;
}
const useDoubleClick = ({ doubleClick, click }: UseDoubleClickInterface) => {
  // we're using useRef here for the useCallback to rememeber the timeout
  const clickTimeout = useRef<any>(null);

  const clearClickTimeout = () => {
    if (clickTimeout) {
      clearTimeout(clickTimeout.current);
      clickTimeout.current = undefined;
    }
  };

  // return a memoized version of the callback that only changes if one of the dependencies has changed
  return useCallback(
    (event: any) => {
      clearClickTimeout();
      if (click && event.detail === 1) {
        clickTimeout.current = setTimeout(() => {
          click(event);
        }, 200);
      }
      if (event.detail % 2 === 0) {
        doubleClick(event);
      }
    },
    [click, doubleClick]
  );
};

export default useDoubleClick;
