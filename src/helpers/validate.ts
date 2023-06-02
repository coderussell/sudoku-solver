import { grid } from "./grid";

export default function validateInput(input: number[]): { valid: boolean, errors: string[] } {
  let valid: boolean = true;
  let errors: string[] = []
  const { rows, columns, squares } = grid;

  // validate cell inputs: integers from 0 to 9
  // TODO: split validation tests and return individual error messages
  const isValidCellValue = (n: number): boolean => (Number.isInteger(n) && n >= 0 && n <= 9)
  input.forEach((cell, index) => {
    if (!isValidCellValue(cell)) {
      valid = false;
      errors.push(`Invalid input at index ${index + 1}`)
    }
  })

  // validate uniqueness in rows
  rows.forEach((row, index) => {
    let values: number[] = row.map(i => input[i]).filter(v => v !== 0)
    console.log(values)
    let uniqueValues: Set<number> = new Set([...values])
    if (values.length !== uniqueValues.size) {
      valid = false;
      errors.push(`Values of row ${index + 1} are not unique`)
    }
  })

  // validate uniqueness in columns
  columns.forEach((column, index) => {
    let values: number[] = column.map(i => input[i]).filter(v => v !== 0)
    let uniqueValues: Set<number> = new Set([...values])
    if (values.length !== uniqueValues.size) {
      valid = false;
      errors.push(`Values of column ${index + 1} are not unique`)
    }
  })

  // validate uniqueness in squares
  squares.forEach((square, index) => {
    let values: number[] = square.map(i => input[i]).filter(v => v !== 0)
    let uniqueValues: Set<number> = new Set([...values])
    if (values.length !== uniqueValues.size) {
      valid = false;
      errors.push(`Values of square ${index + 1} are not unique`)
    }
  })

  return {
    valid,
    errors
  };
}