export enum TokenType {  // Added tokens for the lexer to understand
  Number,
  Identifier,
  Equals,
  Let,
  OpenParen, 
  CloseParen,
  BinOp,
  Null,
  EOF, // End of file token
}

const KEYWORDS: Record<string, TokenType> = {
  // hashmap
  let: TokenType.Let,
  null: TokenType.Null
};

export interface Token {
  value: string;
  type: TokenType;
}

function token (value = "", type: TokenType): Token {
  return {value, type};
}

function isAlpha (src: string) {
  return src.toUpperCase() != src.toLowerCase();
}

function isSkippable (str: string) {
  return str == " " || str == "\n" || str == "\t";
}

function isInt (str: string) {
  const c = str.charCodeAt(0);
  const bounds = ['0'.charCodeAt(0), '9'.charCodeAt(0)];
  return (c >= bounds[0] && c <= bounds[1])
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
    else {
      // Handling multicharacter tokens

      // Building a number token
      if (isInt(src[0])) {
        let num = "";
        while (src.length > 0 && isInt(src[0])) {
          num += src.shift();
        }  //while we hit numeric values

        tokens.push(token(num, TokenType.Number));
      }
      else if (isAlpha(src[0])) {
        let ident = "";
        while (src.length > 0 && isAlpha(src[0])) {
          ident += src.shift();
        }  //while we hit numeric values

        // check for reserved keywords
        const reserved = KEYWORDS[ident];
        if (typeof reserved == "number") {
        tokens.push(token(ident, reserved)); // swap
        } 
        else {
          tokens.push(token(ident, TokenType.Identifier)); // swap
        }
      }
      else if (isSkippable(src[0])) {
        src.shift(); // skips the character
      }
      else {
        console.log("Unknown Character in source: ", src[0].charCodeAt(0), src[0]);
        Deno.exit(1);
      }
    }
  }

  tokens.push({type: TokenType.EOF, value: "EndOfFile"});
  return tokens;
}