import { splitLines } from "./step/01_split_lines.ts";
import { generateNodes } from "./step/02_generate_nodes.ts";
import { buildAst } from "./step/03_build_ast.ts";
import { NodeType } from "./types.ts";

export function parse(markdown: Readonly<string>): Readonly<NodeType[]> {
  return buildAst(generateNodes(splitLines(markdown)))
}
