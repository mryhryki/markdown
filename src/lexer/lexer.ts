export function analyze(markdown: string): LexerAnalyzedType[] {
  // TODO
  return []
}

export type LexerAnalyzedType = {
  position: number;
  row: number;
  col: number;
  text: string;
}
