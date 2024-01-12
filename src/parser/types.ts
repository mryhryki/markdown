interface PositionBase {
  position: number;
  row: number;
  col: number;
}

export interface SplitLineType extends PositionBase {
  indent: string;
  text: string;
}

export type HeadingType = `h${1 | 2 | 3 | 4 | 5 | 6}`;
export type NodeEnumType = HeadingType | "text" | "unordered-list-item";

export interface NodeType extends PositionBase {
  type: NodeEnumType;
  text: string;
  children: NodeType[];
}
