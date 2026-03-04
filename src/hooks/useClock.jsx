import { useEffect, useRef } from "react";

export default function useClock(callback, delay) {
  const savedCallback = useRef();

  // Always keep latest callback
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up interval once
  useEffect(() => {
    if (delay == null) return;

    const id = setInterval(() => {
      if (savedCallback.current) {
        savedCallback.current();
      }
    }, delay);

    return () => clearInterval(id);
  }, [delay]);
}