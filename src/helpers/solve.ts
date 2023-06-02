import { grid } from './grid'
import getPossibleSolutionsForSingleCell from './cell'
import validateInput from './validate'
import isComplete, { getCompleteSectionIndices, type CompleteSections } from './complete'
import fillCell from './fill'

export default function solveComplete(input: number[]) {
  // validate Input
  try {
    const validation = validateInput([...input])
    if (!validation.valid) {
      validation.errors?.forEach(error => {
        throw new Error(error)
      })
    }
  } catch {
    throw new Error('Input could not be validated')
  }

  // get completion of input
  let completion: CompleteSections = getCompleteSectionIndices(input)

  // returns original input, if sudoku is already solved
  if (completion.solved) return input;

  let output: number[] = [...input]

  while (completion.solved === false) {
    // let rowsToCheck: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8]
    // let columnsToCheck: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8]
    // let squaresToCheck: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8]
    // const { completeRows, completeColumns, completeSquares } = completion

    // rowsToCheck = rowsToCheck.filter(row => !completeRows.includes(row))
    // columnsToCheck = columnsToCheck.filter(column => !completeColumns.includes(column))
    // squaresToCheck = squaresToCheck.filter(square => !completeSquares.includes(square))

    // define empty cell indizes
    // let emptyCells: number[] = [];
    // for (let i = 0; i <= 80; i++) {
    //   if (output[i] === 0) emptyCells.push(i)
    // }

    // loop through emptyCells and fill in solutions where possible
    let solvedCells: number = 0;
    output.forEach((cell: number, index) => {
      if (cell === 0) {
        const solutions = getPossibleSolutionsForSingleCell(index, output)
        if (solutions.length === 1) {
          output = fillCell(index, output, solutions[0])
          solvedCells++
        }
      }
    })
    if (solvedCells === 0) throw new Error('Sudoku could not be solved')
    completion = getCompleteSectionIndices(output)
  }

  return output
}