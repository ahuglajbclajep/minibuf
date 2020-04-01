/* eslint-disable react-hooks/exhaustive-deps */
import { get, set } from "idb-keyval";
import { Inputs, useCallback, useEffect, useState } from "preact/hooks";

const useStorage = <T>(
  key: IDBValidKey
): [(value: T) => Promise<void>, () => Promise<T | null>] => {
  const save = useCallback((value: T) => set(key, value), []);
  const load = useCallback(() => get<T | null>(key), []);
  return [save, load];
};

const useDarkmode = (mode?: boolean): [boolean, () => void] => {
  const [isDark, setMode] = useState(
    mode ?? matchMedia("(prefers-color-scheme: dark)").matches
  );
  const toggle = useCallback(() => setMode(prev => !prev), []);

  return [isDark, toggle];
};

const useEffectAsync = (
  // cleanup function is not supported
  effect: () => Promise<void>,
  inputs: Inputs = []
): void => {
  useEffect(() => {
    effect();
  }, inputs);
};

export { useStorage, useDarkmode, useEffectAsync };
