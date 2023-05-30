import { describe, it, expect } from "@jest/globals";
import validateInput from "../helpers/validate";

const invalidSudoku = [
  10, 7, 0, 5, 8, 3, -1, 2, -23,
  0, 5, 9, 2, 0, 0, 3, 0, 0,
  3, 4, 0, 0, 0, 6, 5, 0, 7,
  7, 9, 5, 0, 0, 0, 6, 3, 2,
  0, 0, 3, 6, 9, 7, 1, 0, 0,
  6, 8, 0, 0, 0, 2, 7, 0, 0,
  9, 1, 4, 8, 3, 5, 0, 7, 6,
  0, 3, 0, 7, 0, 1, 4, 9, 5,
  5, 6, 7, 4, 2, 9, 999, 1, 3
]

const validSudoku = [
  0, 7, 0, 5, 8, 3, 0, 2, 0,
  0, 5, 9, 2, 0, 0, 3, 0, 0,
  3, 4, 0, 0, 0, 6, 5, 0, 7,
  7, 9, 5, 0, 0, 0, 6, 3, 2,
  0, 0, 3, 6, 9, 7, 1, 0, 0,
  6, 8, 0, 0, 0, 2, 7, 0, 0,
  9, 1, 4, 8, 3, 5, 0, 7, 6,
  0, 3, 0, 7, 0, 1, 4, 9, 5,
  5, 6, 7, 4, 2, 9, 0, 1, 3
]

describe('validateInput', () => {

  it('returns true for valid inputs', () => {
    const result = validateInput(validSudoku)
    expect(result.valid).toEqual(true)
  })

  it('returns false for invalid inputs', () => {
    const result = validateInput(invalidSudoku)
    expect(result.valid).toEqual(false)
  })

  it('returns correct amount of errors', () => {
    const result = validateInput(invalidSudoku)
    expect(result?.errors?.length).toEqual(4)
  })
})