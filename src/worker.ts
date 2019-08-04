import unified from "unified";
import parse from "remark-parse";
import mutate from "remark-rehype";
import stringify from "rehype-stringify";

// see https://github.com/webpack-contrib/worker-loader/issues/94
declare const self: Worker;

const md2html: (markdown: string) => string = markdown =>
  unified()
    .use(parse)
    .use(mutate)
    .use(stringify)
    .processSync(markdown)
    .toString();

self.onmessage = e => self.postMessage(md2html(e.data));
