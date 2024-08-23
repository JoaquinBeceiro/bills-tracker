import Mexp from "math-expression-evaluator";

export const isMath = (string) => {
  return /\d+(\+|-|\*|\/)\d+/.test(string)
}

export const evaluateMath = (string)  => {
  const mexp = new Mexp();
  return mexp.eval(string)
}
export const isNumber = (string) => {
  return /^[0-9]+$/.test(string)
}