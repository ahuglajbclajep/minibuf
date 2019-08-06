import { h, render, FunctionComponent } from "preact";
import { useState, useRef, useEffect } from "preact/hooks";
import { wrap } from "comlink";
import { WorkerAPI } from "./worker";
import "github-markdown-css/github-markdown.css";
import "./style.css";

type Props = { worker: ComlinkClass<WorkerAPI> };
const App: FunctionComponent<Props> = ({ worker }) => {
  const [markdown, setMarkdown] = useState("");
  const [html, setHtml] = useState("");
  const textarea = useRef<HTMLTextAreaElement>();
  const cursor = useRef(0);

  const onInput: h.JSX.GenericEventHandler = async e => {
    const md = (e.target as HTMLTextAreaElement).value;
    setMarkdown(md);
    setHtml(await worker.md2html(md));
  };

  const onKeyDown: h.JSX.KeyboardEventHandler = async e => {
    if (textarea.current && e.ctrlKey && e.key === "s") {
      e.preventDefault();
      const { formatted, cursorOffset } = await worker.format(
        markdown,
        textarea.current.selectionStart
      );
      setMarkdown(formatted);
      cursor.current = cursorOffset;
    }
  };

  useEffect(() => {
    if (textarea.current) textarea.current.selectionEnd = cursor.current;
  }, [cursor.current]);

  return (
    // see https://stackoverflow.com/questions/43503964/onkeydown-event-not-working-on-divs-in-react
    <div className="container" tabIndex={0} onKeyDown={onKeyDown}>
      <textarea
        className="edit-area"
        ref={textarea}
        value={markdown}
        onInput={onInput}
        autoFocus
        placeholder="# mdpreview"
      />
      <div
        className="markdown-body"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
};

(async () => {
  const WebWorker = wrap<WorkerAPI>(new Worker("./worker", { type: "module" }));
  const worker = await new WebWorker();
  render(<App worker={worker} />, document.body);
})();
