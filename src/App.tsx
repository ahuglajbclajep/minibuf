import { Fragment, FunctionComponent, h, JSX } from "preact";
import { useCallback, useLayoutEffect, useRef, useState } from "preact/hooks";
import {
  useCtrlKeyDown,
  useDarkmode,
  useEffectAsync,
  useStorage,
  useToggle,
} from "./hooks";
import Previewer from "./Previewer";
import { download, isWinChrome, moveCursor, readme } from "./util";
import { format, md2html } from "./worker";

const App: FunctionComponent = () => {
  const [markdown, setMarkdown] = useState("");
  // `hardBreak` means treat normal line breaks like `  `
  const [hardBreak, toggleHardBreak, setHardBreak] = useToggle(false);
  const [html, setHtml] = useState("");
  const [darkMode, toggleDarkMode] = useDarkmode();
  // this is the cursor position after formatting, and is also a flag whether the cursor should be moved
  const formattedCursor = useRef<number | null>(null);

  const textarea = useRef<HTMLTextAreaElement>(null);
  const [saveMarkdown, loadMarkdown] = useStorage<Markdown>("markdown");
  const [saveHardBreak, loadHardBreak] = useStorage<boolean>("hardbreak");

  // load initial state from the storage
  useEffectAsync(async () => {
    const { markdown, cursor } = (await loadMarkdown()) || readme;
    const hardbreak = (await loadHardBreak()) || false;
    const html = await md2html(markdown);

    setMarkdown(markdown);
    setHardBreak(hardbreak);
    setHtml(html);
    formattedCursor.current = cursor;
  }, []);

  // format
  useCtrlKeyDown("d", async () => {
    const { formatted, cursorOffset } = await format(
      markdown,
      textarea.current.selectionStart
    );
    setMarkdown(formatted);
    formattedCursor.current = cursorOffset;
  });

  // save
  useCtrlKeyDown("s", () =>
    saveMarkdown({
      markdown,
      cursor: textarea.current.selectionStart,
    })
  );

  // download
  useCtrlKeyDown("q", () => download(markdown));

  // darkmode
  useCtrlKeyDown("e", () => toggleDarkMode());

  // hardbreak
  useCtrlKeyDown("b", () => {
    // saves the state reversed by `toggle`
    saveHardBreak(!hardBreak);
    toggleHardBreak();
  });

  useLayoutEffect(() => {
    if (formattedCursor.current !== null) {
      moveCursor(textarea.current, formattedCursor.current);
      formattedCursor.current = null;
    }
  });

  const onInput: JSX.GenericEventHandler<HTMLTextAreaElement> = useCallback(
    async (e) => {
      // maybe `currentTarget.value` can only be read once?
      const markdown = e.currentTarget.value;
      const html = await md2html(markdown);
      setMarkdown(markdown);
      setHtml(html);
    },
    []
  );

  return (
    // see https://github.com/microsoft/TypeScript/issues/20469
    <Fragment>
      <div class="container" style={{ "--dark": +darkMode }}>
        <textarea
          class="edit-area"
          // on Windows Chrome, characters are too thin in dark mode
          style={{ fontWeight: isWinChrome && darkMode ? "bold" : "normal" }}
          value={markdown}
          onInput={onInput}
          ref={textarea}
          autoFocus
          spellcheck={false}
          placeholder="# minibuf"
        />
        <Previewer html={html} hardBreak={hardBreak} />
      </div>
    </Fragment>
  );
};

export default App;
