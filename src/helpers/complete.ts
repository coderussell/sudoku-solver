import { grid } from "./grid";

// checks if a row, column or square has each interger from 1 to 9 exactly once
export default function isComplete(sectionType: 'rows' | 'columns' | 'squares', sectionIndex: number, input: number[]): boolean {
  let values: number[] = grid[sectionType][sectionIndex].map(i => input[i]).filter(v => v !== 0)
  let uniqueValues: Set<number> = new Set([...values])

  const allCellsUniquleyFilled: boolean = uniqueValues.size === 9;
  const hasEveryValidInteger: boolean = values.reduce((a, b) => a + b) === 45

  return allCellsUniquleyFilled && hasEveryValidInteger
}