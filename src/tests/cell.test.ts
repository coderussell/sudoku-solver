import { describe, it, expect } from '@jest/globals'
import getPossibleSolutionsForSingleCell from '../helpers/cell'

const sudoku = [
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

describe('cell', () => {

  it('returns possible inputs as array', () => {
    expect(getPossibleSolutionsForSingleCell(60, sudoku)).toEqual([2])
    expect(getPossibleSolutionsForSingleCell(32, sudoku)).toEqual([4, 8])
  })

  it("returns 'solved' for cells with value > 0", () => {
    expect(getPossibleSolutionsForSingleCell(1, sudoku)).toBe('solved')
    expect(getPossibleSolutionsForSingleCell(80, sudoku)).toBe('solved')
    expect(getPossibleSolutionsForSingleCell(45, sudoku)).toBe('solved')
  })

  it("throws error for cell values > 9", () => {
    expect(() => getPossibleSolutionsForSingleCell(78, sudoku)).toThrow()
    expect(() => getPossibleSolutionsForSingleCell(0, sudoku)).toThrow()
  })

  it("throws error for cell values > 9", () => {
    expect(() => getPossibleSolutionsForSingleCell(78, sudoku)).toThrow()
    expect(() => getPossibleSolutionsForSingleCell(0, sudoku)).toThrow()
  })

  it("throws error for negative cell values", () => {
    expect(() => getPossibleSolutionsForSingleCell(6, sudoku)).toThrow()
    expect(() => getPossibleSolutionsForSingleCell(8, sudoku)).toThrow()
  })
})