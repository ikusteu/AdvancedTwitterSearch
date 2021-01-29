// import from node modules
import { useRef, useCallback, useState, useEffect } from 'react';

// local types and interfaces
interface UpdateObserverFn {
  (node: any): void;
}

interface ObserverHook {
  (observerCallback: (...args: any[]) => unknown | unknown[], args: any[]): [
    UpdateObserverFn,
    unknown
  ];
}

/**
 * Uses intersection observer to trigger data fetching.
 *
 * @param observerCallback callback (data fetch) function to be fired on intersection trigger
 *
 * @param args callback function args in form of an array
 *
 * @returns a tuple: [updateObserverFn, data] --> updateObserverFn is used as useCallback() function to update intersection anchor, data is fresh fetched data and is not stored internally, should be stored outside the hook
 */
const useObserver: ObserverHook = (observerCallback, args) => {
  // init state for data to be returned
  const [data, setData] = useState<unknown>(null);

  // init internal state
  const [fireFunction, setFireFunction] = useState(false);

  // init observer
  const observer = useRef<IntersectionObserver | null>(null);

  // callback to update observer, to be returned from hook
  const updateObserver = useCallback((node) => {
    // clean up previous observer
    if (observer.current) {
      observer.current.disconnect();
    }

    // set new observer with current node
    observer.current = new IntersectionObserver(([entry]) => {
      setFireFunction(entry.isIntersecting);
    });

    if (node) {
      observer.current.observe(node);
    }
  }, []);

  // controls data fetching function calls
  useEffect(() => {
    if (fireFunction) {
      setData(observerCallback(...args));
      setFireFunction(false);
    }
  }, [fireFunction]);

  return [updateObserver, data];
};

export default useObserver;
