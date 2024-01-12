import { SplitLineType } from "../types.ts";

export function splitLines(markdown: string): Readonly<SplitLineType[]> {
  const generator = new Generator();

  let row = 0;
  let startOfRowPosition = 0;

  markdown.split("").forEach((char, position) => {
    const data: SplitLineType = { position, row, col: position - startOfRowPosition, text: char, indent: "" };
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
  });

  generator.flush();
  return generator.results;
}

const NoData = -1;
const IndentMatcher = new RegExp(/^([ ]+)/);

class Generator {
  #results: SplitLineType[] = [];

  #position: number = NoData;
  #row: number = NoData;
  #col: number = NoData;
  #buffer: string[] = [];

  #reset(): void {
    this.#position = NoData;
    this.#row = NoData;
    this.#col = NoData;
    this.#buffer = [];
  }

  append(data: SplitLineType): void {
    if (this.#position === NoData) {
      this.#position = data.position;
      this.#row = data.row;
      this.#col = data.col;
    }
    this.#buffer.push(data.text);
  }

  flush(): void {
    if (this.#buffer.length === 0) return;

    const text = this.#buffer.join("");
    const indent: string = text.match(IndentMatcher)?.[0] ?? "";
    this.#results.push({
      position: this.#position,
      row: this.#row,
      col: this.#col,
      indent,
      text,
    });

    this.#reset();
  }

  get results(): Readonly<SplitLineType[]> {
    return this.#results;
  }
}
