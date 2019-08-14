import { h, render, FunctionComponent } from "preact";
import { useState, useSetStateWithCallback, useCallbackRef } from "./hooks";
import { wrap } from "comlink";
import { WorkerAPI } from "./worker";
import { download, setCursor } from "./lib";
import "github-markdown-css/github-markdown.css";
import "./style.css";

type InitialState = Data & { darkmode: boolean };
type Props = { worker: ComlinkClass<WorkerAPI>; state: InitialState };
const App: FunctionComponent<Props> = ({ worker, state }) => {
  const [markdown, setMarkdown] = useSetStateWithCallback(state.markdown);
  const [html, setHtml] = useState(state.html);
  const [textarea, cbRef] = useCallbackRef<HTMLTextAreaElement>(e =>
    setCursor(e, state.cursor)
  );
  const [darkmode, setDarkmode] = useState(state.darkmode);

  const onInput: h.JSX.GenericEventHandler = async e => {
    const md = (e.target as HTMLTextAreaElement).value;
    setMarkdown(md);
    setHtml(await worker.md2html(md));
  };

  const onKeyDown: h.JSX.KeyboardEventHandler = async e => {
    if (e.ctrlKey && e.key === "f") {
      e.preventDefault();
      const { formatted, cursorOffset } = await worker.format(
        markdown,
        textarea.selectionStart
      );
      setMarkdown(formatted, () => setCursor(textarea, cursorOffset));
    } else if (e.ctrlKey && e.key === "s") {
      e.preventDefault();
      worker.save(markdown, textarea.selectionStart);
    } else if (e.ctrlKey && e.key === "d") {
      e.preventDefault();
      download(markdown);
    } else if (e.ctrlKey && e.key === "e") {
      e.preventDefault();
      setDarkmode(!darkmode);
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
          ref={cbRef}
          value={markdown}
          onInput={onInput}
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

(async () => {
  addEventListener("load", () => {
    navigator.serviceWorker.register("./service-worker.js");
  });

  const WebWorker = wrap<WorkerAPI>(new Worker("./worker", { type: "module" }));
  const worker = await new WebWorker();
  const data = await worker.load();
  const darkmode = matchMedia("(prefers-color-scheme: dark)").matches;
  render(<App worker={worker} state={{ ...data, darkmode }} />, document.body);
})();
