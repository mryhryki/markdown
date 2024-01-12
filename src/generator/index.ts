import { NodeType } from "../parser/types.ts";

export function generate(ast: Readonly<NodeType[]>): string {
  return ast.map((node, i) =>
    toHtml({
      node,
      isNested: false,
      prevNode: ast[i - 1],
      nextNode: ast[i + 1],
    })
  ).join("");
}

interface ToHtmlArgs {
  node: Readonly<NodeType>;
  isNested: boolean;
  prevNode: Readonly<NodeType> | null | undefined;
  nextNode: Readonly<NodeType> | null | undefined;
}

function toHtml({ node, prevNode, nextNode, isNested }: ToHtmlArgs): string {
  switch (node.type) {
    case "h1":
    case "h2":
    case "h3":
    case "h4":
    case "h5":
    case "h6":
      return `<${node.type}>${
        node.children.map((child) =>
          toHtml({
            node: child,
            isNested: true,
            prevNode: null,
            nextNode: null,
          })
        ).join("")
      }</${node.type}>`;
    case "unordered-list-item": {
      const text = node.children.map((child) =>
        toHtml({
          node: child,
          isNested: true,
          prevNode: null,
          nextNode: null,
        })
      ).join("");
      return [
        prevNode?.type === "unordered-list-item" ? "" : "<ul>",
        `<li>${text}</li>`,
        nextNode?.type === "unordered-list-item" ? "" : "</ul>",
      ].join("");
    }
    case "text": {
      if (isNested) {
        return node.text.trim();
      }
      return `<p>${node.text.trim()}</p>`;
    }
  }
}
