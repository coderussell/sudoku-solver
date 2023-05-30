import { grid } from "./grid";

export default function validateInput(input: number[]): { valid: boolean, errors?: string[] } {

  // valid cell values are integers from 0 to 9
  // TODO: split validation tests and return individual error messages
  const isValidCellValue = (n: number): boolean => (Number.isInteger(n) && n >= 0 && n <= 9)

  // TODO: check if numbers in rows, columns, squares are unique

  let valid: boolean = true;
  let errors: string[] = []

  input.forEach((cell, index) => {
    if (!isValidCellValue(cell)) {
      valid = false;
      errors.push(`Invalid input at index ${index}`)
    }
  })

  return {
    valid,
    errors
  };
}