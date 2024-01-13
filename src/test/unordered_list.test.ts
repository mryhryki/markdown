import { assertEquals } from "assert";
import { convert } from "../index.ts";

Deno.test("Unordered-List test", async (t) => {
  await t.step("Flat", () => {
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

  await t.step("Nested", () => {
    const markdown = [
      "- Item1", //
      "- Item2",
      "  - Item2-1",
      "  - Item2-2",
      "  - Item2-3",
      "- Item3",
    ].join("\n");
    const html = [
      "<ul>", //
      "<li>Item1</li>",
      "<li>Item2",
      /**/ "<ul>",
      /******/ "<li>Item2</li>",
      /******/ "<li>Item2</li>",
      /******/ "<li>Item2</li>",
      /**/ "</ul>",
      "</li>",
      "<li>Item3</li>",
      "</ul>",
    ].join("");
    assertEquals(convert(markdown), html);
  });
});
