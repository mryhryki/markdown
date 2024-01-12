import { generate } from "./generator/index.ts";
import { parse } from "./parser/index.ts";

export const convert = (markdown: string): string => {
  const ast = parse(markdown);
  return generate(ast);
};
