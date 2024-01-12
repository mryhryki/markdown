import { NodeType } from "../parser/types.ts";

export function generate(ast: Readonly<NodeType[]>): string {
  return ast.map((node) => toHtml(node, false)).join("");
}

function toHtml(node: Readonly<NodeType>, isNested: boolean): string {
  switch (node.type) {
    case "h1":
    case "h2":
    case "h3":
    case "h4":
    case "h5":
    case "h6":
      return `<${node.type}>${
        node.children.map((child) => toHtml(child, true)).join("")
      }</${node.type}>`;
    case "text": {
      if (isNested) {
        return node.text;
      }
      return `<p>${node.text}</p>`;
    }
  }
}
