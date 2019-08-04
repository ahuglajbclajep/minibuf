import { h, render, FunctionComponent } from "preact";
import { useState } from "preact/hooks";
import { wrap } from "comlink";
import { WorkerAPI } from "./worker";
import "github-markdown-css/github-markdown.css";
import "./style.css";

type Props = { worker: ComlinkClass<WorkerAPI> };
const App: FunctionComponent<Props> = ({ worker }) => {
  const [html, setHtml] = useState("");

  const onInput: h.JSX.GenericEventHandler = async e => {
    setHtml(await worker.md2html((e.target as HTMLTextAreaElement).value));
  };

  return (
    <div className="container">
      <textarea
        className="edit-area"
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
