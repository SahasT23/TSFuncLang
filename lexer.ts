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

function token (value = "", type: TokenType): Token {
  return {value, type};
}

export function tokenise (srcCode: string): Token[] {
  const tokens = new Array<Token>();
  const src = srcCode.split(""); // Every single character will have a split
 
  // Building each token until the end of the file and then remove them -> need to make it more memory efficient later
  while (src.length > 0) {
    if (src[0] == "(") {
      tokens.push(token(src.shift(), TokenType.OpenParen));
    }
    else if (src[0] == ")") {
      tokens.push(token(src.shift(), TokenType.CloseParen));
    }
    else if (src[0] == "+" || src[0] == "-" || src[0] == "*" || src[0] == "/") {  // All binary operators
      tokens.push(token(src.shift(), TokenType.BinOp));
    }
    else if (src[0] == "=") {
      tokens.push(token(src.shift(), TokenType.Equals));
    }
  }

  return tokens;
}