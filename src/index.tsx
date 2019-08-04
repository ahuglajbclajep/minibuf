import { h, render, FunctionComponent } from "preact";
import { useState } from "preact/hooks";
import { wrap } from "comlink";
import { WorkerAPI } from "./worker";
import "github-markdown-css/github-markdown.css";
import "./style.css";

type Props = { worker: ComlinkClass<WorkerAPI> };
const App: FunctionComponent<Props> = ({ worker }) => {
  const [markdown, setMarkdown] = useState("");
  const [html, setHtml] = useState("");

  const onInput: h.JSX.GenericEventHandler = async e => {
    const md = (e.target as HTMLTextAreaElement).value;
    setMarkdown(md);
    setHtml(await worker.md2html(md));
  };

  const onKeyDown: h.JSX.KeyboardEventHandler = async e => {
    if (e.ctrlKey && e.key === "s") {
      e.preventDefault();
      setMarkdown(await worker.format(markdown));
    }
  };

  return (
    // see https://stackoverflow.com/questions/43503964/onkeydown-event-not-working-on-divs-in-react
    <div className="container" tabIndex={0} onKeyDown={onKeyDown}>
      <textarea
        className="edit-area"
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
