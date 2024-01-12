import { assertEquals } from "assert";
import { convert } from "../index.ts";

Deno.test("Unordered-List test", async (t) => {
  const markdown = [
    "- Item1", //
    "- Item2",
    "- Item3",
  ].join("\n");
  const html = [
    "<ul>", //
    "<li>Item1</li>",
    "<li>Item2</li>",
    "<li>Item3</li>",
    "</ul>",
  ].join("");
  assertEquals(convert(markdown), html);
});
