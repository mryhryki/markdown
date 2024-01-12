import { assertEquals } from "assert";
import { convert } from "../index.ts";

Deno.test("Unordered-List test", async (t) => {
  const markdown = [
    "- Element1", //
    "- Element2",
    "- Element3",
  ].join("\n");
  const html = [
    "<ul>", //
    "<li>Line1</li>",
    "<li>Line2</li>",
    "<li>Line3</li>",
    "</ul>",
  ].join("");
  assertEquals(convert(markdown), html);
});
