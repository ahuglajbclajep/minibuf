import { Fragment, FunctionComponent, h, JSX } from "preact";
import { useEffect, useRef, useState } from "preact/hooks";
import {
  useCtrlKeyDown,
  useDarkmode,
  useEffectAsync,
  useStorage
} from "./hooks";
import { download, readme, setCursor } from "./lib";
import { format, md2html } from "./worker";

const initialData: Data = { markdown: readme, cursorPos: readme.length };

const App: FunctionComponent = () => {
  const [markdown, setMarkdown] = useState("");
  const [html, setHtml] = useState("");
  const cursor = useRef(0);

  const textarea = useRef<HTMLTextAreaElement>(null);
  const [save, load] = useStorage<Data>("mdprev-markdown");
  const [darkmode, darkmodeToggle] = useDarkmode();

  useEffectAsync(async () => {
    const { markdown, cursorPos } = (await load()) || initialData;
    const html = await md2html(markdown);
    setMarkdown(markdown);
    setHtml(html);
    cursor.current = cursorPos;
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
    cursor.current = cursorOffset;
  });

  useEffect(() => {
    setCursor(textarea.current, cursor.current);
  }, [cursor.current]);

  const onInput: JSX.GenericEventHandler<HTMLTextAreaElement> = async e => {
    const markdown = e.currentTarget.value;
    const html = await md2html(markdown);
    setMarkdown(markdown);
    setHtml(html);
  };

  return (
    <Fragment>
      <div className={`dark-layer ${darkmode ? "enable" : ""}`} />
      <div className="container">
        <textarea
          className="edit-area"
          value={markdown}
          onInput={onInput}
          ref={textarea}
          autoFocus
          spellcheck={false}
          placeholder="# mdpreview"
        />
        <div
          className="markdown-body"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </Fragment>
  );
};

export default App;
