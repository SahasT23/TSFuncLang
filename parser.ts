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

  private eat () {
    const prev = this.tokens.shift() as Token;
    return prev;
  }

  private expect(type: TokenType, err: any) {
    const prev = this.tokens.shift() as Token;
    if (!prev || prev.type != type) {
      console.error("Parser Error:\n", err, prev, " - Expecting: ", type);
      Deno.exit(1);
    }

    return prev;
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
    return program
  }
    private parse_stmt (): Stmt {

      return this.parse_exp();
    }

    private parse_exp (): Expr {
      return this.parse_add_exp();
    }

    private parse_add_exp(): Expr {
      let left = this.parse_multipli_exp();

      while (this.atF().value == "+" || this.atF().value == "-") {
        const operator = this.eat().value;
        const right = this.parse_multipli_exp();
        left = {
          kind: "BinExp",
          left,
          right,
          operator,
        } as BinExp;
      }

      return left;
    }

    private parse_multipli_exp(): Expr {
      let left = this.parse_primary_exp();

      while (this.atF().value == "/" || this.atF().value == "*" || this.atF().value == "%") {
        const operator = this.eat().value;
        const right = this.parse_primary_exp();
        left = {
          kind: "BinExp",
          left,
          right,
          operator,
        } as BinExp;
      }

      return left;
    }

    private parse_primary_exp (): Expr {
      const tk = this.atF().type;

      switch (tk) {
        case TokenType.Identifier:
          return { kind: "Identifier", symbol: this.eat().value } as Identifier; 
        case TokenType.Number:
          return { kind: "NumericLiteral", value:parseFloat(this.eat().value) } as NumericLiteral; 
        default:
          console.error("unexpected token found during parsing", this.atF());
          Deno.exit(1);
          return {} as Stmt;
      }
    }
  }
    
// needs to be done by next saturda