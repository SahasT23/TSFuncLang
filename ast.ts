// add ast nodes for the parser

export type NodeType = "Program" 
| "NumericLiteral" 
| "Identifier" 
| "BinExp" 
| "CallExp" 
| "UnaryExp" 
| "FuncDec";

export interface Stmt {
  kind: NodeType;  // everything a statement inherits from
}

export interface Program extends Stmt {
  kind: "Program";
  body: Stmt[];
}

export interface Expr extends Stmt {}

export interface BinExp extends Expr {
  kind: "BinExp",
  left: Expr,
  right: Expr,
  operator: string;
}

// numeric literals + identifiers

export interface Identifier extends Expr {
  kind: "Identifier";
  symbol: string;
}

export interface NumericLiteral extends Expr {
  kind: "NumericLiteral";
  value: number;
}