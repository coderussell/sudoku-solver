import { grid } from "./grid";

export default function getPossibleSolutionsForSingleCell(cellIndex: number, input: any[]): number[] | string {
  //input = [0, 0, 9, 0, 5, 6, 0, 0, 3, ....]
  const cellValue = input[cellIndex]

  // fallback for invalid cell input
  if (!Number.isInteger(cellValue) || cellValue > 9 || cellValue < 0) throw new Error(`invalid cell input at index ${cellIndex}`);

  // returns 'solved' for already solved cells
  if (cellValue > 0) return 'solved';

  let p = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  const { rows, columns, squares } = grid;
  const rowIndex = rows.findIndex(row => row.includes(cellIndex))
  const columnIndex = columns.findIndex(column => column.includes(cellIndex))
  const squareIndex = squares.findIndex(square => square.includes(cellIndex))

  // check against row
  rows[rowIndex].forEach((rowCell) => {
    if (input[rowCell] > 0) p = p.filter(int => int !== input[rowCell])
  })

  //check against column
  columns[columnIndex].forEach((columnCell) => {
    if (input[columnCell] > 0) p = p.filter(int => int !== input[columnCell])
  })

  //check against square
  squares[squareIndex].forEach((squareCell) => {
    if (input[squareCell] > 0) p = p.filter(int => int !== input[squareCell])
  })

  return p;
}