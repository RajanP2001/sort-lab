import type { SortStep } from "../engine/sortingTypes";

export function bubbleSortSteps(array: number[]): SortStep[] {
  const arr = [...array];
  const steps: SortStep[] = [];
  const n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - 1 - i; j++) {
      steps.push({ type: "compare", indices: [j, j + 1] });

      if (arr[j] > arr[j + 1]) {
        steps.push({ type: "swap", indices: [j, j + 1] });
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }

  return steps;
}
