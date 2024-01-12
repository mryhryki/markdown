import { parse } from "./parser/index.ts";

export const convert = (markdown: string): string => {
  const ast = parse(markdown)
  // TODO
  return "<h1>H1</h1>";
};
