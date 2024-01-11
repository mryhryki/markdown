import { assertEquals } from "assert";
import { convert } from "../index.ts";

Deno.test("Heading test", async (t) => {
  await t.step("<h1>", async (t) => {
    await t.step("Through", () => {
      const markdown = "# H1";
      const html = "<h1>H1</h1>";
      assertEquals(convert(markdown), html);
    });
  });

  await t.step("<h2>", async (t) => {
    await t.step("Through", () => {
      const markdown = "## H2";
      const html = "<h1>H2</h1>";
      assertEquals(convert(markdown), html);
    });
  });
});
