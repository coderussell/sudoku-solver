import { grid } from "./grid";

export interface CompleteSections {
  solved: boolean;
  completeRows: number[];
  completeColumns: number[];
  completeSquares: number[];
}

// checks if a row, column or square has each interger from 1 to 9 exactly once
export default function isComplete(sectionType: 'rows' | 'columns' | 'squares', sectionIndex: number, input: number[]): boolean {
  let values: number[] = grid[sectionType][sectionIndex].map(i => input[i]).filter(v => v !== 0)
  if (values.length === 0) return false;

  let uniqueValues: Set<number> = new Set([...values])

  const allCellsUniquleyFilled: boolean = uniqueValues.size === 9;
  const hasEveryValidInteger: boolean = values.reduce((a, b) => a + b) === 45

  return allCellsUniquleyFilled && hasEveryValidInteger
}

export function getCompleteSectionIndices(input: number[]): CompleteSections {
  try {
    let completeRows: number[] = [];
    let completeColumns: number[] = [];
    let completeSquares: number[] = [];


    for (let i = 0; i < 9; i++) {
      console.log(completeRows)
      if (isComplete('rows', i, [...input])) completeRows.push(i)
      if (isComplete('columns', i, [...input])) completeColumns.push(i)
      if (isComplete('squares', i, [...input])) completeSquares.push(i)
    }

    const solved = completeRows.length === 9 && completeColumns.length === 9 && completeSquares.length === 9

    console.log(solved)

    return {
      solved,
      completeRows,
      completeColumns,
      completeSquares
    }
  } catch {
    throw new Error('Completion check failed.')
  }

}