interface PositionBase {
  position: number;
  row: number;
  col: number;
}

export interface SplitLineType extends PositionBase {
  indent: string;
  text: string;
}

