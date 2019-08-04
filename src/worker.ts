import unified from "unified";
import parse from "remark-parse";
import mutate from "remark-rehype";
import stringify from "rehype-stringify";
import { expose } from "comlink";

let format: typeof import("prettier/standalone").format | undefined;
let mdPlugin: typeof import("prettier/parser-markdown") | undefined;

class WebWorker {
  md2html(markdown: string): string {
    return unified()
      .use(parse)
      .use(mutate)
      .use(stringify)
      .processSync(markdown)
      .toString();
  }

  format(markdown: string): string {
    return format && mdPlugin
      ? format(markdown, { parser: "markdown", plugins: [mdPlugin] })
      : markdown;
  }
}

expose(WebWorker);

(async () => {
  const [formatter, plugin] = await Promise.all([
    import("prettier/standalone"),
    import("prettier/parser-markdown")
  ]);
  format = formatter.format;
  mdPlugin = plugin;
})();

export type WorkerAPI = typeof WebWorker;
