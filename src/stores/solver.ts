import { ref, computed, reactive, type Ref } from 'vue'
import { defineStore } from 'pinia'
import solveComplete from '../helpers/solve'
import validateInput from '@/helpers/validate'
import solveSection from '@/helpers/section'

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
  // const example: number[] = [
  //   0, 7, 0, 5, 8, 3, 0, 2, 0,
  //   0, 5, 9, 2, 0, 0, 3, 0, 0,
  //   3, 4, 0, 0, 0, 6, 5, 0, 7,
  //   7, 9, 5, 0, 0, 0, 6, 3, 2,
  //   0, 0, 3, 6, 9, 7, 1, 0, 0,
  //   6, 8, 0, 0, 0, 2, 7, 0, 0,
  //   9, 1, 4, 8, 3, 5, 0, 7, 6,
  //   0, 3, 0, 7, 0, 1, 4, 9, 5,
  //   5, 6, 7, 4, 2, 9, 0, 1, 3
  // ]

  const example = [
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
        sudoku[index] = solution.output[index]
      })
    }

    for (let i = 0; i <= 80; i++) {
      if (sudoku[i] === 0) {
        await assignSolution(i)
      }
    }

    if (!solution.solved) messages.push('No unique solution for this puzzle.')
    // if (solution.solved) messages.push('Boom. Here is your solution.')

    // Object.assign(sudoku, solution)
  }

  const showExample = (): void => {
    Object.assign(sudoku, example)
    solvedIndices.length = 0;
  }

  const validate = () => {
    const validation = validateInput(sudoku)
    messages.length = 0;
    Object.assign(messages, validation?.errors)
  }

  const iterationCount: Ref<number> = ref(0);

  const solveSingle = () => {
    let firstIteration = [...sudoku];
    const sectionTypes: ('rows' | 'columns' | 'squares')[] = ['rows', 'columns', 'squares']

    // loop throgh a random section type
    for (let i = 0; i <= 8; i++) {
      firstIteration = solveSection(sectionTypes[iterationCount.value], i, firstIteration)
    }
    iterationCount.value++

    // get indices that solved compared to original input
    const solved: number[] = []
    firstIteration.forEach((cell, index) => {
      if (cell > 0 && cell !== sudoku[index]) solved.push(index)
    })

    if (!solved.length && iterationCount.value < 2) return solveSingle
    if (!solved.length && iterationCount.value === 2) {
      iterationCount.value = 0;
      throw new Error('no solution found.')
    }

    // get random index
    const randomIndex: number = Math.floor(Math.random() * solved.length)
    const singleSolutionIndex: number = solved[randomIndex]

    // fill in one cell at random index
    solvedIndices.push(singleSolutionIndex)
    sudoku[singleSolutionIndex] = firstIteration[singleSolutionIndex]

    iterationCount.value = 0;
  }

  return { sudoku, example, solvedIndices, messages, solve, clear, showExample, validate, solveSingle }
})