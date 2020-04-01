import morphdom from "morphdom";
import { FunctionComponent, h } from "preact";
import { useLayoutEffect, useRef } from "preact/hooks";

// inspired by https://github.com/mizchi/mdbuf/blob/be1581f/src/main/components/organisms/Preview.tsx
type Props = { html: string };
const Preview: FunctionComponent<Props> = ({ html }) => {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const request = requestAnimationFrame(() => {
      morphdom(ref.current, `<div class="markdown-body">${html}</div>`);
    });

    return (): void => cancelAnimationFrame(request);
  });

  return <div class="markdown-body" ref={ref} />;
};

export default Preview;
