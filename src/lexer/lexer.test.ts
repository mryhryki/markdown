import { assertEquals } from "assert";
import { analyze, LexerAnalyzedType } from "./lexer.ts";

Deno.test("Lexer", async (t) => {
  await t.step("Basic", async () => {
    const markdown = "Line1\nLine2\nLine3";
    const expectValue: LexerAnalyzedType[] = [
      {
        position: 0,
        row: 0,
        col: 0,
        text: "Line1\n",
      },
      {
        position: 6,
        row: 1,
        col: 0,
        text: "Line2\n",
      },
      {
        position: 12,
        row: 2,
        col: 0,
        text: "Line3",
      },
    ];
    assertEquals(analyze(markdown), expectValue);
  });
});
