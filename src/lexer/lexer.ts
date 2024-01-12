export function analyze(markdown: string): Readonly<LexerAnalyzedType[]> {
  const results: LexerAnalyzedType[] = [];
  const generator = new Generator();

  let row = 0;
  let startOfRowPosition = 0;

  markdown.split("").forEach((char, position) => {
    const data: LexerAnalyzedType = { position, row, col: position - startOfRowPosition, text: char };
    switch (char) {
      case "\n": {
        row++;
        startOfRowPosition = position + 1;
        generator.append(data);
        generator.flush();
        break;
      }
      default: {
        generator.append(data);
        break;
      }
    }
    results.push({
      position,
      row,
      col: position - startOfRowPosition + 1,
      text: char,
    });
  });

  generator.flush();
  return generator.results;
}

const NoData = -1;

class Generator {
  #position: number = NoData;
  #row: number = NoData;
  #col: number = NoData;
  #buf: string[] = [];

  #results: LexerAnalyzedType[] = [];

  append(data: LexerAnalyzedType): void {
    if (this.#position === NoData) {
      this.#position = data.position;
      this.#row = data.row;
      this.#col = data.col;
    }
    this.#buf.push(data.text);
  }

  flush(): void {
    if (this.#buf.length === 0) return;
    this.#results.push({
      position: this.#position,
      row: this.#row,
      col: this.#col,
      text: this.#buf.join(""),
    });
    this.#position = NoData;
    this.#row = NoData;
    this.#col = NoData;
    this.#buf = [];
  }

  get results(): Readonly<LexerAnalyzedType[]> {
    return this.#results;
  }
}

export type LexerAnalyzedType = {
  position: number;
  row: number;
  col: number;
  text: string;
}