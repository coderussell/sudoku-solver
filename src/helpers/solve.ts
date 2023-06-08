import { grid } from './grid'
import getPossibleSolutionsForSingleCell from './cell'
import validateInput from './validate'
import isComplete, { getCompleteSectionIndices, type CompleteSections } from './complete'
import fillCell from './fill'
import solveSection from './section'

export default function solveComplete(input: number[]): { output: number[], solved: boolean } {
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
  if (completion.solved) return {
    output: input,
    solved: true
  };

  let output: number[] = [...input]

  while (completion.solved === false) {
    let solvedCellsCount: number = output.filter(el => el !== 0).length

    // loop through sections
    for (let i = 0; i <= 8; i++) {
      output = solveSection('rows', i, output)
      output = solveSection('columns', i, output)
      output = solveSection('squares', i, output)
    }

    let newSolvedCellsCount: number = output.filter(el => el !== 0).length

    // // if (solvedCells === 0) throw new Error('Sudoku could not be solved')
    if (newSolvedCellsCount === solvedCellsCount) {
      console.log(output)
      break;
    };
    completion = getCompleteSectionIndices(output)
  }

  return {
    output,
    solved: completion.solved
  }
}