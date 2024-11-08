import { RuntimeVal } from "./values.ts";

export default class Environ {

  private parent?: Environ;  // could be undefined
  private variables: Map<string, RuntimeVal>;

  constructor (parentENV?: Environ) {
    this.parent = parentENV;
    this.variables = new Map();
  }

  public declareVar (varname: string, value: RuntimeVal): RuntimeVal {
    if (this.variables.has(varname)) {
      throw `Cannot declare variable ${varname}. Already defined.`;
    }

    this.variables.set(varname, value);
    return value;
  }

  public assignVar (varname: string, value: RuntimeVal): RuntimeVal {
    if (this.variables)
  };

  public resolvefunc (varname: string): Environ {
    if (this.variables.has(varname))
      return this;

    if (this.parent == undefined)
      throw `Cannot resolve '${varname}' as it does not exist.`;
    return this.parent.resolvefunc(varname);
  }
}