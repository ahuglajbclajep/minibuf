import unified from "unified";
import parse from "remark-parse";
import mutate from "remark-rehype";
import stringify from "rehype-stringify";
import { expose } from "comlink";

class WebWorker {
  md2html(markdown: string): string {
    return unified()
      .use(parse)
      .use(mutate)
      .use(stringify)
      .processSync(markdown)
      .toString();
  }
}

expose(WebWorker);

export type WorkerAPI = typeof WebWorker;
