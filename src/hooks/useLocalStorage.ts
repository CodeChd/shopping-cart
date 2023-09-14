import { useState, useEffect } from "react";

export function useLocalStorage<T>(key: string, iniTialValue: T | (() => T)) {
  const [value, setValue] = useState<T>(() => {
    const jsonValue = localStorage.getItem(key);
    if (jsonValue != null) return JSON.parse(jsonValue);

    if (typeof iniTialValue === "function") {
      return iniTialValue as () => T;
    } else {
      return iniTialValue;
    }

  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as [typeof value, typeof setValue]
}
