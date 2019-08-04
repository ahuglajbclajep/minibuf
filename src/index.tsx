import { h, render, FunctionComponent } from "preact";
import { useState } from "preact/hooks";

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
    // see https://github.com/Microsoft/TypeScript/issues/20469
    <div>
      <textarea onInput={onInput} />
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
};

render(<App />, document.body);
