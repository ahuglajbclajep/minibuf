import { get, set } from "idb-keyval";
import { CursorResult as Formatted } from "prettier";
import stringify from "rehype-stringify";
import parse from "remark-parse";
import mutate from "remark-rehype";
import unified from "unified";
import { readme } from "./lib";

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

  save(markdown: string, cursor: number): void {
    Promise.all([set("markdown", markdown), set("cursor", cursor)]);
  }

  async load(): Promise<Data> {
    const [md, cursor] = await Promise.all([
      get<string | undefined>("markdown"),
      get<number | undefined>("cursor")
    ]);
    const markdown = md || readme;
    const html = this.md2html(markdown);
    return { markdown, html, cursor: cursor || readme.length };
  }
}

(async () => {
  const [formatter, plugin] = await Promise.all([
    import("prettier/standalone"),
    import("prettier/parser-markdown")
  ] as const);
  format = formatter.formatWithCursor;
  mdPlugin = plugin;
})();

export { WebWorker };
