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
      const html = "<h2>H2</h2>";
      assertEquals(convert(markdown), html);
    });
  });

  await t.step("<h3>", async (t) => {
    await t.step("Through", () => {
      const markdown = "### H3";
      const html = "<h3>H3</h3>";
      assertEquals(convert(markdown), html);
    });
  });

  await t.step("<h4>", async (t) => {
    await t.step("Through", () => {
      const markdown = "#### H4";
      const html = "<h4>H4</h4>";
      assertEquals(convert(markdown), html);
    });
  });

  await t.step("<h5>", async (t) => {
    await t.step("Through", () => {
      const markdown = "##### H5";
      const html = "<h5>H5</h5>";
      assertEquals(convert(markdown), html);
    });
  });

  await t.step("<h6>", async (t) => {
    await t.step("Through", () => {
      const markdown = "###### H6";
      const html = "<h6>H6</h6>";
      assertEquals(convert(markdown), html);
    });
  });

  await t.step("# x7 is not heading", async (t) => {
    const markdown = "####### Not a title";
    // TODO: expected paragraph (<p>)
    const html = "####### Not a title";
    assertEquals(convert(markdown), html);
  });
});
