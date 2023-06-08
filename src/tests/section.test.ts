import { describe, it, expect } from "@jest/globals";
import solveSection from "../helpers/section";

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

describe('section', () => {

  it('returns updated section', () => {
    expect(solveSection('rows', 1, sudoku)).toBeDefined
  })
})