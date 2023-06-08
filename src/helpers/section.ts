import { grid } from "./grid";
import getPossibleSolutionsForSingleCell from "./cell";
import fillCell from "./fill";

export default function solveSection(sectionType: 'rows' | 'columns' | 'squares', sectionIndex: number, input: number[]): number[] {
  let output: number[] = [...input]
  let sectionOutput: number[][] = []

  // check each cell in section for possible numbers
  grid[sectionType][sectionIndex].forEach((cellIndex, index) => {
    const p: number[] = getPossibleSolutionsForSingleCell(cellIndex, [...input])
    sectionOutput.push(p)
  })

  sectionOutput = sectionOutput.map((cell, index, section) => {
    if (cell.length === 1) return cell;

    const solvedNumbers = section.filter(el => el.length === 1).map(el => el[0])

    // remove already present numbers in this section from possibilities
    cell = cell.filter(p => !solvedNumbers.includes(p))

    // check if one possibible solution is unique to this cell and replace possibilites with solution
    let uniquePossibility: number | null = null;
    cell.forEach(p => {
      if (!section.some((el, i) => i !== index && el.includes(p))) uniquePossibility = p;
    })
    if (!!uniquePossibility) cell = [uniquePossibility]

    return cell
  })

  // fill in solution to complete grid to return updated solution
  grid[sectionType][sectionIndex].forEach((cellIndex, index) => {
    if (sectionOutput[index].length === 1) {
      output = fillCell(cellIndex, [...output], sectionOutput[index][0])
    }
  })

  return output
}