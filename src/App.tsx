import { FunctionComponent, h, JSX } from "preact";
import { useEffect, useRef, useState } from "preact/hooks";
import { useDarkmode, useEffectAsync, useStorage } from "./hooks";
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

  useEffect(() => {
    setCursor(textarea.current, cursor.current);
  }, [cursor.current]);

  const onInput: JSX.GenericEventHandler<HTMLTextAreaElement> = async e => {
    const markdown = e.currentTarget.value;
    const html = await md2html(markdown);
    setMarkdown(markdown);
    setHtml(html);
  };

  const onKeyDown: JSX.KeyboardEventHandler<HTMLElement> = async e => {
    if (e.ctrlKey && e.key === "f") {
      e.preventDefault();
      const { formatted, cursorOffset } = await format(
        markdown,
        textarea.current.selectionStart
      );
      setMarkdown(formatted);
      cursor.current = cursorOffset;
    } else if (e.ctrlKey && e.key === "s") {
      e.preventDefault();
      save({ markdown, cursorPos: textarea.current.selectionStart });
    } else if (e.ctrlKey && e.key === "d") {
      e.preventDefault();
      download(markdown);
    } else if (e.ctrlKey && e.key === "e") {
      e.preventDefault();
      darkmodeToggle();
    }
  };

  return (
    // see https://dev.wgao19.cc/sun-moon-blending-mode
    // see https://github.com/microsoft/TypeScript/issues/20469
    // see https://stackoverflow.com/questions/43503964/onkeydown-event-not-working-on-divs-in-react
    <div>
      <div className={`dark-layer ${darkmode ? "enable" : ""}`} />
      <div className="container" tabIndex={-1} onKeyDown={onKeyDown}>
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
    </div>
  );
};

export default App;
