// fills in single cell returns updated input (sudoku)
export default function fillCell(cellIndex: number, input: number[], solution: number): number[] {
  // fallback for invalid solutions
  if (!solution || !Number.isInteger(solution) || solution < 0 || solution > 9) return input;
  const newInput = [...input]

  newInput[cellIndex] = solution

  return newInput;
}