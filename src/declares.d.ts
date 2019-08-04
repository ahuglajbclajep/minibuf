declare module "remark-parse";
declare module "remark-rehype";
declare module "rehype-stringify";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ComlinkClass<T extends new (...args: any) => any> = InstanceType<
  import("comlink").Remote<T>
> extends Promise<infer U>
  ? U
  : unknown;
