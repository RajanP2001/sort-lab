import type { SortStep } from "../engine/sortingTypes";

function partition(
  arr: number[],
  steps: SortStep[],
  low: number,
  high: number,
): number {
  let i = low - 1;

  for (let j = low; j < high; j++) {
    steps.push({ type: "compare", indices: [j, high] });
    if (arr[j] <= arr[high]) {
      i++;
      if (i !== j) {
        steps.push({ type: "swap", indices: [i, j] });
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
    }
  }

  if (i + 1 !== high) {
    steps.push({ type: "swap", indices: [i + 1, high] });
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  }

  return i + 1;
}

function quickSortHelper(
  arr: number[],
  steps: SortStep[],
  low: number,
  high: number,
) {
  if (low >= high) return;

  const pivotIdx = partition(arr, steps, low, high);
  quickSortHelper(arr, steps, low, pivotIdx - 1);
  quickSortHelper(arr, steps, pivotIdx + 1, high);
}

export function quickSortSteps(array: number[]): SortStep[] {
  const arr = [...array];
  const steps: SortStep[] = [];
  quickSortHelper(arr, steps, 0, arr.length - 1);
  return steps;
}
