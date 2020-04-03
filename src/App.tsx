import { Fragment, FunctionComponent, h, JSX } from "preact";
import { useLayoutEffect, useRef, useState } from "preact/hooks";
import {
  useCtrlKeyDown,
  useDarkmode,
  useEffectAsync,
  useStorage,
  useToggle
} from "./hooks";
import Previewer from "./Previewer";
import { download, isWinChrome, moveCursor, readme } from "./util";
import { format, md2html } from "./worker";

const App: FunctionComponent = () => {
  const [markdown, setMarkdown] = useState("");
  const [hardBreak, toggleHardBreak, setHardBreak] = useToggle(false);
  const [html, setHtml] = useState("");
  const [darkMode, toggleDarkMode] = useDarkmode();
  const formattedCursor = useRef<number | null>(null);

  const textarea = useRef<HTMLTextAreaElement>(null);
  const [saveMarkdown, loadMarkdown] = useStorage<Markdown>("markdown");
  const [saveHardBreak, loadHardBreak] = useStorage<boolean>("hardbreak");

  useEffectAsync(async () => {
    const { markdown, cursor } = (await loadMarkdown()) || readme;
    const hardbreak = (await loadHardBreak()) ?? true;
    const html = await md2html(markdown);
    setMarkdown(markdown);
    setHardBreak(hardbreak);
    setHtml(html);
    formattedCursor.current = cursor;
  }, []);

  useCtrlKeyDown("q", () => download(markdown));
  useCtrlKeyDown("e", () => toggleDarkMode());
  useCtrlKeyDown("s", () =>
    saveMarkdown({ markdown, cursor: textarea.current.selectionStart })
  );
  useCtrlKeyDown("d", async () => {
    const { formatted, cursorOffset } = await format(
      markdown,
      textarea.current.selectionStart
    );
    setMarkdown(formatted);
    formattedCursor.current = cursorOffset;
  });
  useCtrlKeyDown("b", () => {
    saveHardBreak(!hardBreak);
    toggleHardBreak();
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
      <div class="container dark-layer" style={{ "--dark": +darkMode }}>
        <textarea
          class="edit-area"
          style={{ fontWeight: isWinChrome && darkMode ? "bold" : "normal" }}
          value={markdown}
          onInput={onInput}
          ref={textarea}
          autoFocus
          spellcheck={false}
          placeholder="# mdpreview"
        />
        <Previewer html={html} hardBreak={hardBreak} />
      </div>
    </Fragment>
  );
};

export default App;
