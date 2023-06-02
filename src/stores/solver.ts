import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import solveComplete from '../helpers/solve'
import validateInput from '@/helpers/validate'

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

  const solvedIndices: number[] = reactive([])

  const messages: string[] = reactive([])

  // TEST
  const example: number[] = [
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

  const clear = () => {
    const emptySudoku: number[] = [];
    for (let i = 0; i <= 80; i++) {
      emptySudoku.push(0);
    }
    Object.assign(sudoku, emptySudoku)
    solvedIndices.length = 0
    messages.length = 0
  }

  const sleep = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  const solve = async (): Promise<void> => {
    const solution = solveComplete(sudoku)

    const assignSolution = (index: number) => {
      return sleep(50).then(() => {
        solvedIndices.push(index)
        sudoku[index] = solution[index]
      })
    }

    for (let i = 0; i <= 80; i++) {
      if (sudoku[i] === 0) {
        await assignSolution(i)
      }
    }

    // Object.assign(sudoku, solution)
  }

  const showExample = (): void => {
    Object.assign(sudoku, example)
  }

  // TODO: Function 'sovlveSingle'

  const validate = () => {
    const validation = validateInput(sudoku)
    Object.assign(messages, validation?.errors)
  }

  return { sudoku, example, solvedIndices, messages, solve, clear, showExample, validate }
})