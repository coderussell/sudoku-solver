import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import solveComplete from '../helpers/solve'

export const useSolver = defineStore('solver', () => {

  const sudoku: number[] = reactive([
    0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0
  ])

  // TEST
  // const sudoku: number[] = reactive([
  //   0, 7, 0, 5, 8, 3, 0, 2, 0,
  //   0, 5, 9, 2, 0, 0, 3, 0, 0,
  //   3, 4, 0, 0, 0, 6, 5, 0, 7,
  //   7, 9, 5, 0, 0, 0, 6, 3, 2,
  //   0, 0, 3, 6, 9, 7, 1, 0, 0,
  //   6, 8, 0, 0, 0, 2, 7, 0, 0,
  //   9, 1, 4, 8, 3, 5, 0, 7, 6,
  //   0, 3, 0, 7, 0, 1, 4, 9, 5,
  //   5, 6, 7, 4, 2, 9, 0, 1, 3
  // ])

  const reset = () => {
    const emptySudoku: number[] = [];
    for (let i = 0; i <= 81; i++) {
      emptySudoku.push(0);
    }
    Object.assign(sudoku, emptySudoku)
  }

  const solve = (): void => {
    const solution = solveComplete(sudoku)
    Object.assign(sudoku, solution)
  }

  // TODO: Function 'sovlveSingle'

  return { sudoku, solve, reset }
})