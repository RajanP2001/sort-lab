import type { SortStep } from "../engine/sortingTypes";

export function insertionSortSteps(array: number[]): SortStep[] {
  const arr = [...array];
  const steps: SortStep[] = [];
  const n = arr.length;

  for (let i = 1; i < n; i++) {
    let j = i;

    while (j > 0) {
      steps.push({ type: "compare", indices: [j - 1, j] });
      if (arr[j] < arr[j - 1]) {
        steps.push({ type: "swap", indices: [j - 1, j] });
        [arr[j], arr[j - 1]] = [arr[j - 1], arr[j]];
        j--;
      } else {
        break;
      }
    }
  }

  return steps;
}
