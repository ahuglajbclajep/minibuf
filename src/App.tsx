import { Fragment, FunctionComponent, h, JSX } from "preact";
import { useLayoutEffect, useRef, useState } from "preact/hooks";
import {
  useCtrlKeyDown,
  useDarkmode,
  useEffectAsync,
  useStorage
} from "./hooks";
import HtmlPreview from "./HtmlPreview";
import { defaultData, download, isWinChrome, moveCursor } from "./lib";
import { format, md2html } from "./worker";

const App: FunctionComponent = () => {
  const [markdown, setMarkdown] = useState("");
  const [html, setHtml] = useState("");
  const formattedCursor = useRef<number | null>(null);

  const textarea = useRef<HTMLTextAreaElement>(null);
  const [save, load] = useStorage<Data>("mdprev-markdown");
  const [darkmode, darkmodeToggle] = useDarkmode();

  useEffectAsync(async () => {
    const { markdown, cursorPos } = (await load()) || defaultData;
    const html = await md2html(markdown);
    setMarkdown(markdown);
    setHtml(html);
    formattedCursor.current = cursorPos;
  }, []);

  useCtrlKeyDown("q", () => download(markdown));
  useCtrlKeyDown("e", () => darkmodeToggle());
  useCtrlKeyDown("s", () =>
    save({ markdown, cursorPos: textarea.current.selectionStart })
  );
  useCtrlKeyDown("d", async () => {
    const { formatted, cursorOffset } = await format(
      markdown,
      textarea.current.selectionStart
    );
    setMarkdown(formatted);
    formattedCursor.current = cursorOffset;
  });

  useLayoutEffect(() => {
    if (formattedCursor.current !== null) {
      moveCursor(textarea.current, formattedCursor.current);
      formattedCursor.current = null;
    }
  });

  const onInput: JSX.GenericEventHandler<HTMLTextAreaElement> = async e => {
    const markdown = e.currentTarget.value;
    const html = await md2html(markdown);
    setMarkdown(markdown);
    setHtml(html);
  };

  return (
    <Fragment>
      <div class="container dark-layer" style={{ "--dark": +darkmode }}>
        <textarea
          class="edit-area"
          style={{ fontWeight: isWinChrome && darkmode ? "bold" : "normal" }}
          value={markdown}
          onInput={onInput}
          ref={textarea}
          autoFocus
          spellcheck={false}
          placeholder="# mdpreview"
        />
        <HtmlPreview html={html} />
      </div>
    </Fragment>
  );
};

export default App;
