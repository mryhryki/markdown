import { NodeType } from "../parser/types.ts";

export function generate(ast: Readonly<NodeType[]>): string {
  return ast.map(toHtml).join("");
}

function toHtml(node: Readonly<NodeType>): string {
  switch (node.type) {
    case "h1":
    case "h2":
    case "h3":
    case "h4":
    case "h5":
    case "h6":
      return `<${node.type}>${
        node.children.map(toHtml).join("")
      }</${node.type}>`;
    case "text":
      return node.text;
  }
}
