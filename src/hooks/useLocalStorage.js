import { useState, useEffect } from 'react';
import { storage } from '../utils/storage';

// Generic hook — पुन्हा पुन्हा वापरता येईल
export const useLocalStorage = (key, initialValue) => {
  const [value, setValue] = useState(() => storage.get(key, initialValue));

  useEffect(() => {
    storage.set(key, value);
  }, [key, value]);

  return [value, setValue];
};