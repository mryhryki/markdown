import { assertEquals } from "assert";
import { SplitLineType } from "../types.ts";
import { splitLines } from "./01_split_lines.ts";

Deno.test("splitLines()", () => {
  const markdown = [
    "# Line1", //
    "Line2\r", //
    "- Line3", //
    "  - Line4", //
  ].join("\n");

  const expectValues: SplitLineType[] = [
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
    {
      position: 15,
      row: 2,
      col: 0,
      indent: "",
      text: "- Line3\n",
    },
    {
      position: 23,
      row: 3,
      col: 0,
      indent: "  ",
      text: "  - Line4",
    },
  ];
  const results = splitLines(markdown);
  assertEquals(results, expectValues);
});
