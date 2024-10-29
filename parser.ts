import {
  Stmt, 
  Program, 
  Expr, 
  BinExp, 
  NumericLiteral, 
  Identifier} 
from "./ast.ts";

import { 
  tokenise, 
  Token, 
  TokenType } 
from "./lexer.ts";

export default class Parser {
  // takes in tokens from tokeniser
  private tokens: Token[] = [];

  private not_eof (): boolean {
    return this.tokens[0].type != TokenType.EOF; // Parses until this point then stops
  }

  private atF () {
    return this.tokens[0] as Token;
  }

  public produceAST (srcCode: string): Program {
    this.tokens = tokenise(srcCode);
    
    const program: Program = {
      kind: "Program",
      body: [],
    };

    while (this.not_eof()) {
      program.body.push(this.parse_stmt()); // entry point for parser
    }

    private parse_stmt (): Stmt {

      return this.parse_exp();
    }

    private parse_exp (): Expr {

    }

    private parse_primary_exp (): Expr {
      const tk = this.atF().type;

      switch (tk) {
        case TokenType.Number:
        case TokenType.Identifier:
          return { kind: "Identifier" } as Identifier; 
        case TokenType.Equals:
        case TokenType.Let:
        case TokenType.OpenParen:
        case TokenType.CloseParen:
        case TokenType.BinOp:
        case TokenType.EOF:
      }
    }

    return program;
  }
}