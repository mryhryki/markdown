import { assertEquals } from "assert";
import { convert } from "../index.ts";

Deno.test("Paragraph test", async (t) => {
  const markdown = [
    "Line1", //
    "Line2",
    "Line3",
  ].join("\n");
  const html = [
    "<p>Line1</p>", //
    "<p>Line2</p>",
    "<p>Line3</p>",
  ].join("");
  assertEquals(convert(markdown), html);
});
