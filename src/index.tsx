import { h, render, FunctionComponent } from "preact";
import { useState, useRef, useEffect } from "preact/hooks";
import { wrap } from "comlink";
import { WorkerAPI } from "./worker";
import { download } from "./lib";
import "github-markdown-css/github-markdown.css";
import "./style.css";

type Props = { worker: ComlinkClass<WorkerAPI>; data: Data };
const App: FunctionComponent<Props> = ({ worker, data }) => {
  const [markdown, setMarkdown] = useState(data.markdown);
  const [html, setHtml] = useState(data.html);
  const textarea = useRef<HTMLTextAreaElement>();
  const cursor = useRef(data.cursor);

  const onInput: h.JSX.GenericEventHandler = async e => {
    const md = (e.target as HTMLTextAreaElement).value;
    setMarkdown(md);
    setHtml(await worker.md2html(md));
  };

  const onKeyDown: h.JSX.KeyboardEventHandler = async e => {
    if (e.ctrlKey && e.key === "f" && textarea.current) {
      e.preventDefault();
      const { formatted, cursorOffset } = await worker.format(
        markdown,
        textarea.current.selectionStart
      );
      setMarkdown(formatted);
      cursor.current = cursorOffset;
    } else if (e.ctrlKey && e.key === "d") {
      e.preventDefault();
      download(markdown);
    } else if (e.ctrlKey && e.key === "s" && textarea.current) {
      e.preventDefault();
      worker.save(markdown, textarea.current.selectionStart);
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
  const data = await worker.load();
  render(<App worker={worker} data={data} />, document.body);
})();
