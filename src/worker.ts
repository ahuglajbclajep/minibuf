import unified from "unified";
import parse from "remark-parse";
import mutate from "remark-rehype";
import stringify from "rehype-stringify";
import { CursorResult as Formatted } from "prettier";
import { expose } from "comlink";

let format: typeof import("prettier/standalone").formatWithCursor | undefined;
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

  format(markdown: string, cursorOffset: number): Formatted {
    return format && mdPlugin
      ? format(markdown, {
          cursorOffset,
          parser: "markdown",
          plugins: [mdPlugin]
        })
      : { formatted: markdown, cursorOffset };
  }
}

expose(WebWorker);

(async () => {
  const [formatter, plugin] = await Promise.all([
    import("prettier/standalone"),
    import("prettier/parser-markdown")
  ]);
  format = formatter.formatWithCursor;
  mdPlugin = plugin;
})();

export type WorkerAPI = typeof WebWorker;
