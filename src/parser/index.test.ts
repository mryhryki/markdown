import { assertEquals } from "assert";
import { NodeType } from "./types.ts";
import { parse } from "./index.ts";

Deno.test("parse()", async (t) => {
  await t.step("Should return to markdown text from parsed nodes", () => {
    const markdown = [
      "# Line1", //
      "Line2\r", //
      "- Line3", //
      "  - Line4", //
    ].join("\n");

    assertEquals(markdown, returnToText(parse(markdown)));
  });
});

function returnToText(nodes: Readonly<NodeType[]>): string {
  const texts: string[] = [];
  nodes.forEach(({text, children}) => {
    texts.push(text);
    texts.push(returnToText(children));
  })
  return texts.join("");
}

