export enum TokenType {  // Added tokens for the lexer to understand
  Number,
  Identifier,
  Equals,
  Let,
  OpenParen, 
  CloseParen,
  BinOp,
}

export interface Token {
  value: string;
  type: TokenType;
}

export function tokenise (srcCode: string): Token[] {
  const tokens = new Array<Token>();
  const src = srcCode.split("") // Every single character will have a split
 
  // Building each token until the end of the file and then remove them -> need to make it more memory efficient later
  while (src.length > 0) {
    g
  }

  return tokens
}