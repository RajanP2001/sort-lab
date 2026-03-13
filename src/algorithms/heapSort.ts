import type { SortStep } from "../engine/sortingTypes";

function heapify(
  arr: number[],
  steps: SortStep[],
  n: number,
  i: number,
) {
  let largest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;

  if (left < n) {
    steps.push({ type: "compare", indices: [left, largest] });
    if (arr[left] > arr[largest]) largest = left;
  }

  if (right < n) {
    steps.push({ type: "compare", indices: [right, largest] });
    if (arr[right] > arr[largest]) largest = right;
  }

  if (largest !== i) {
    steps.push({ type: "swap", indices: [i, largest] });
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    heapify(arr, steps, n, largest);
  }
}

export function heapSortSteps(array: number[]): SortStep[] {
  const arr = [...array];
  const steps: SortStep[] = [];
  const n = arr.length;

  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr, steps, n, i);
  }

  for (let i = n - 1; i > 0; i--) {
    steps.push({ type: "swap", indices: [0, i] });
    [arr[0], arr[i]] = [arr[i], arr[0]];
    heapify(arr, steps, i, 0);
  }

  return steps;
}
