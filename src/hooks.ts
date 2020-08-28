/* eslint-disable react-hooks/exhaustive-deps */

import { get, set } from "idb-keyval";
import {
  Inputs,
  StateUpdater,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "preact/hooks";

const useToggle = (
  initialState: boolean
): [boolean, () => void, StateUpdater<boolean>] => {
  const [state, setState] = useState(initialState);
  const toggle = useCallback(() => setState((prev) => !prev), []);

  // `setState` can be used to initialize or reset `state`
  return [state, toggle, setState];
};

const useDarkmode = (): ReturnType<typeof useToggle> =>
  useToggle(matchMedia("(prefers-color-scheme: dark)").matches);

const namespace = "minibuf"; // IndexedDB is shared within a domain
const useStorage = <T>(
  key: string
): [(value: T) => Promise<void>, () => Promise<T | null>] => {
  const save = useCallback((value: T) => set(`${namespace}-${key}`, value), []);
  const load = useCallback(() => get<T | null>(`${namespace}-${key}`), []);

  return [save, load];
};

const useEffectAsync = (
  effect: () => Promise<void>, // cleanup function is not supported
  inputs?: Inputs
): void => {
  useEffect(() => {
    effect();
  }, inputs);
};

type Handler = (e: KeyboardEvent) => void | Promise<void>;
const useCtrlKeyDown = (key: string, handler: Handler): void => {
  // see https://reactjs.org/docs/hooks-faq.html#what-can-i-do-if-my-effect-dependencies-change-too-often
  const ref = useRef<Handler>(null);
  ref.current = handler;

  useEffect(() => {
    const listener = (e: KeyboardEvent): void => {
      if (e.ctrlKey && e.key === key) {
        e.preventDefault();
        ref.current(e);
      }
    };

    document.addEventListener("keydown", listener);

    return (): void => {
      document.removeEventListener("keydown", listener);
    };
  }, []);
};

export { useToggle, useDarkmode, useStorage, useEffectAsync, useCtrlKeyDown };
