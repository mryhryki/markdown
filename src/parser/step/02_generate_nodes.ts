import { HeadingType, NodeType, SplitLineType } from "../types.ts";

export function generateNodes(
  lines: Readonly<SplitLineType[]>,
): Readonly<NodeType[]> {
  const results: NodeType[] = [];
  for (const line of lines) {
    getNodes(line).forEach((node) => {
      results.push(node);
    });
  }
  return results;
}

const HeadingPattern = new RegExp("^#{1,6}[ \t]+");
const UnorderedListItemPattern = new RegExp("^([-*][ \t]+)");

function getNodes(line: SplitLineType): NodeType[] {
  // Heading
  if (line.indent === "") {
    const headingMarker = line.text.match(HeadingPattern)?.[0];
    if (headingMarker != null) {
      const type = `h${headingMarker.trim().length}` as HeadingType;
      return [
        {
          position: line.position,
          row: line.row,
          col: line.col,
          type,
          text: line.text.substring(0, headingMarker.length),
          children: getNodes({
            position: line.position + headingMarker.length,
            row: line.row,
            col: line.col + headingMarker.length,
            indent: "",
            text: line.text.substring(headingMarker.length),
          }),
        },
      ];
    }
  }

  // Unordered list item
  const unorderedListItemMatch = line.text.match(UnorderedListItemPattern);
  if (unorderedListItemMatch != null) {
    const [marker] = unorderedListItemMatch;
    return [
      {
        position: line.position,
        row: line.row,
        col: line.col,
        type: "unordered-list-item",
        text: `${line.indent}${marker}`,
        children: getNodes({
          position: line.position + line.indent.length + marker.length,
          row: line.row,
          col: line.col + line.indent.length + marker.length,
          indent: "",
          text: line.text.substring(line.indent.length + marker.length),
        }),
      },
    ];
  }

  return [
    {
      position: line.position,
      row: line.row,
      col: line.col,
      type: "text",
      text: line.text,
      children: [],
    },
  ];
}
