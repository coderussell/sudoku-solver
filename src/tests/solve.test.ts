import { describe, it, expect } from "@jest/globals";
import solveComplete from "../helpers/solve";
import { beforeEach } from "node:test";

const validSudoku = [
  2, 0, 3, 0, 0, 0, 0, 8, 0,
  0, 0, 1, 9, 0, 7, 4, 0, 0,
  0, 0, 4, 5, 2, 0, 1, 0, 0,
  0, 0, 0, 7, 0, 0, 0, 5, 0,
  7, 0, 0, 0, 9, 0, 0, 0, 6,
  0, 6, 0, 0, 0, 1, 0, 0, 0,
  0, 0, 2, 0, 1, 8, 9, 0, 0,
  0, 0, 7, 4, 0, 5, 6, 0, 0,
  0, 3, 0, 0, 0, 0, 5, 0, 8
]

describe('solve', () => {

  it('returns a valid solution', () => {
    let solution = solveComplete(validSudoku).output
    expect(solution).toBeDefined
    expect(solution.length).toBe(81)
    expect(solution).not.toContain(0)
  })

})