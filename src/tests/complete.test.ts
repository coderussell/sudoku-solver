import { describe, it, expect } from "@jest/globals";
import isComplete from "../helpers/complete";

const sudoku = [
  0, 7, 0, 5, 8, 3, 0, 2, 0,
  0, 5, 9, 2, 0, 0, 3, 0, 0,
  3, 4, 0, 0, 0, 6, 5, 0, 7,
  7, 9, 5, 0, 0, 0, 6, 3, 2,
  0, 2, 3, 6, 9, 7, 1, 0, 0,
  6, 8, 0, 0, 0, 2, 7, 0, 0,
  9, 1, 4, 8, 3, 5, 2, 7, 6,
  0, 3, 0, 7, 0, 1, 4, 9, 5,
  5, 6, 7, 4, 2, 9, 8, 1, 3
]

const invalidSudoku = [
  0, 7, 0, 5, 8, 3, 0, 2, 0,
  0, 5, 9, 2, 0, 0, 3, 0, 0,
  3, 4, 0, 0, 0, 6, 5, 0, 7,
  7, 9, 5, 0, 0, 0, 6, 3, 2,
  0, 4, 3, 6, 9, 7, 1, 0, 0,
  6, 8, 0, 0, 0, 2, 7, 0, 0,
  9, 1, 4, 8, 3, 5, 4, 7, 6,
  0, 3, 0, 7, 0, 1, 4, 9, 5,
  5, 6, 7, 4, 3, 9, 8, 1, 3
]

describe('complete', () => {
  // rows
  it('returns true for complete rows', () => {
    expect(isComplete('rows', 8, sudoku)).toBe(true)
  })

  it('returns false for incomplete rows', () => {
    expect(isComplete('rows', 7, sudoku)).toBe(false)
    expect(isComplete('rows', 0, sudoku)).toBe(false)
  })

  // columns
  it('returns true for complete columns', () => {
    expect(isComplete('columns', 1, sudoku)).toBe(true)
  })

  it('returns false for incomplete rows', () => {
    expect(isComplete('columns', 7, sudoku)).toBe(false)
    expect(isComplete('columns', 0, sudoku)).toBe(false)
  })

  // squares
  it('returns true for complete squares', () => {
    expect(isComplete('squares', 8, sudoku)).toBe(true)
  })

  it('returns false for incomplete squares', () => {
    expect(isComplete('squares', 3, sudoku)).toBe(false)
    expect(isComplete('squares', 4, sudoku)).toBe(false)
  })

  // invalid
  it('returns false for invalid inputs', () => {
    expect(isComplete('rows', 8, invalidSudoku)).toBe(false)
    expect(isComplete('columns', 1, invalidSudoku)).toBe(false)
    expect(isComplete('squares', 8, invalidSudoku)).toBe(false)
  })
})