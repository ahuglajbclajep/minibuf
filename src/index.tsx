import { h, render, FunctionComponent } from "preact";
import { useState } from "preact/hooks";
import "github-markdown-css/github-markdown.css";
import "./style.css";

const worker = new Worker("./worker", { type: "module" });
const receive: () => Promise<string> = () =>
  new Promise(resolve => (worker.onmessage = e => resolve(e.data)));

const App: FunctionComponent = () => {
  const [html, setHtml] = useState("");

  const onInput: h.JSX.GenericEventHandler = async e => {
    worker.postMessage((e.target as HTMLTextAreaElement).value);
    setHtml(await receive());
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

render(<App />, document.body);
