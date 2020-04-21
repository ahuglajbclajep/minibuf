import morphdom from "morphdom";
import { FunctionComponent, h } from "preact";
import { memo } from "preact/compat";
import { useEffect, useRef } from "preact/hooks";

// inspired by https://github.com/mizchi/mdbuf/blob/be1581f/src/main/components/organisms/Preview.tsx
type Props = { html: string; hardBreak: boolean };
const Previewer: FunctionComponent<Props> = ({ html, hardBreak }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const request = requestAnimationFrame(() => {
      morphdom(ref.current, `<div>${html}</div>`, { childrenOnly: true });
    });

    return (): void => cancelAnimationFrame(request);
  });

  return (
    <div
      class="markdown-body"
      style={{ "--space": hardBreak ? "pre-wrap" : "normal" }}
      ref={ref}
    />
  );
};

export default memo(Previewer);
