import { assertEquals } from "assert";
import { NodeType, SplitLineType } from "../types.ts";
import { generateNodes } from "./02_generate_nodes.ts";

Deno.test("generateNodes()", async () => {
  const lines: SplitLineType[] = [
    {
      position: 0,
      row: 0,
      col: 0,
      indent: "",
      text: "# Line1\n",
    },
    {
      position: 8,
      row: 1,
      col: 0,
      indent: "",
      text: "Line2\r\n",
    },
  ];
  const results = generateNodes(lines);

  const expectValues: NodeType[] = [
    {
      position: 0,
      row: 0,
      col: 0,
      type: "h1",
      text: "# ",
      children: [
        {
          position: 2,
          row: 0,
          col: 2,
          type: "text",
          text: "Line1\n",
          children: [],
        },
      ],
    },
    {
      position: 8,
      row: 1,
      col: 0,
      type: "text",
      text: "Line2\r\n",
      children: [],
    },
  ];
  assertEquals(results, expectValues);
});
