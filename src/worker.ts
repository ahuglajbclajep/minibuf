// see https://github.com/GoogleChromeLabs/comlink-loader/tree/2.0.0#singleton-mode
/* eslint-disable @typescript-eslint/require-await */

import { CursorResult as Formatted } from "prettier";
import stringify from "rehype-stringify";
import parse from "remark-parse";
import mutate from "remark-rehype";
import unified from "unified";

let formatter: typeof import("prettier/standalone") | undefined;
let plugin: typeof import("prettier/parser-markdown") | undefined;
(async (): Promise<void> => {
  [formatter, plugin] = await Promise.all([
    import("prettier/standalone"),
    import("prettier/parser-markdown"),
  ] as const);
})();

async function md2html(markdown: string): Promise<string> {
  return unified()
    .use(parse)
    .use(mutate)
    .use(stringify)
    .processSync(markdown)
    .toString();
}

async function format(markdown: string, cursor: number): Promise<Formatted> {
  return formatter && plugin
    ? formatter.formatWithCursor(markdown, {
        cursorOffset: cursor,
        parser: "markdown",
        plugins: [plugin],
      })
    : { formatted: markdown, cursorOffset: cursor };
}

export { md2html, format };
