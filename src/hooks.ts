import { RefCallback } from "preact";
import {
  useState,
  StateUpdater,
  useLayoutEffect,
  useCallback
} from "preact/hooks";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Arg1<F extends (...args: any) => any> = Parameters<F>[0];

const useSetStateWithCallback: <S>(
  initialState: S | (() => S) // Arg1<typeof useState<S>>
) => [
  S,
  (value: Arg1<StateUpdater<S>>, cb?: (state: S) => void) => void
] = initialState => {
  const [state, setState] = useState(initialState);

  // This hooks should work correctly because `useLayoutEffect()` is always
  // executed without receiving `cb`.
  /* eslint-disable @typescript-eslint/explicit-function-return-type, react-hooks/rules-of-hooks */
  const setStateWithCallback = (
    value: Arg1<typeof setState>,
    cb: (_: typeof state) => void = () => {}
  ) => {
    setState(value);
    useLayoutEffect(() => cb(state));
  };
  /* eslint-enable */

  return [state, setStateWithCallback];
};

// see https://reactjs.org/docs/hooks-faq.html#how-can-i-measure-a-dom-node
const useCallbackRef: <E extends HTMLElement>(
  cb: (element: E) => void
) => [E, RefCallback<E>] = cb => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [ref, setRef] = useState<Arg1<typeof cb>>(null as any);
  const cbRef = useCallback((node: Arg1<typeof cb> | null) => {
    if (node) {
      setRef(node);
      cb(node);
    }
    // If `cb` is included in the dependency, `cb` is called twice.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return [ref, cbRef];
};

export * from "preact/hooks";
export { useSetStateWithCallback, useCallbackRef };
