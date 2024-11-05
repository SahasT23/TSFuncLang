import { NullVal, NumberVal, RuntimeVal, ValueType } from "./values.ts";
import { BinExp, NodeType, NumericLiteral, Program, Stmt } from "../frontend/ast.ts";

function eval_Numeric_BinExp (lhs: NumberVal, rhs: NumberVal, operator: string): NumberVal {
  let result: number;
  if (operator == "+") {
    result = lhs.value + rhs.value; }
  else if (operator == "-")
    {result = lhs.value - rhs.value;}
  else if (operator == "*")
    {result = lhs.value * rhs.value;}
  else if (operator == "/") // Need to add division by zero 
    {result = lhs.value / rhs.value;}
  else {
    result = lhs.value % rhs.value
  }

  return {value: result, type: "number"};
}

function eval_Bin_Exp (binOp: BinExp): RuntimeVal {

  const lhs = evaluate(binOp.left);
  const rhs = evaluate(binOp.right); 

  if (lhs.type == "number" && rhs.type == "number" ) {
    return eval_Numeric_BinExp(lhs as NumberVal, rhs as NumberVal, binOp.operator)
  }

  // one or both are null values
  return { type: "null", value: "null"} as NullVal;
}

function eval_Program (program: Program): RuntimeVal {
  let lastEval: RuntimeVal = {type: "null", value: "null"} as NullVal;

  for (const statement of program.body) {
    lastEval = evaluate(statement);
  }

  return lastEval;
}

export function evaluate (astNode: Stmt): RuntimeVal { // takes in AST node and translates to values

  switch (astNode.kind) {
    case "NumericLiteral":
      return {value: 
        ((astNode as NumericLiteral).value), 
        type: "number"} as NumberVal;
    case "BinExp":
      return eval_Bin_Exp(astNode as BinExp);
    case "NullLiteral":
      return {
        value: "null", type: "null"  
      } as NullVal;
    case "Program":
      return eval_Program(astNode as Program);
   /* case "Identifier":
    case "CallExp":
    case "UnaryExp":
    case "FuncDec": */
    default: 
      console.error("node hasn't been fully set up", astNode);
      Deno.exit(1);
  }
}