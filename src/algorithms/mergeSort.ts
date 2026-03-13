import type { SortStep } from "../engine/sortingTypes";

function merge(
  arr: number[],
  steps: SortStep[],
  left: number,
  mid: number,
  right: number,
) {
  const leftArr = arr.slice(left, mid);
  const rightArr = arr.slice(mid, right);

  let i = 0;
  let j = 0;
  let k = left;

  while (i < leftArr.length && j < rightArr.length) {
    if (leftArr[i] <= rightArr[j]) {
      steps.push({ type: "overwrite", index: k, value: leftArr[i] });
      arr[k] = leftArr[i];
      i++;
    } else {
      steps.push({ type: "overwrite", index: k, value: rightArr[j] });
      arr[k] = rightArr[j];
      j++;
    }
    k++;
  }

  while (i < leftArr.length) {
    steps.push({ type: "overwrite", index: k, value: leftArr[i] });
    arr[k] = leftArr[i];
    i++;
    k++;
  }

  while (j < rightArr.length) {
    steps.push({ type: "overwrite", index: k, value: rightArr[j] });
    arr[k] = rightArr[j];
    j++;
    k++;
  }
}

function mergeSortHelper(
  arr: number[],
  steps: SortStep[],
  left: number,
  right: number,
) {
  if (right - left <= 1) return;

  const mid = Math.floor((left + right) / 2);
  mergeSortHelper(arr, steps, left, mid);
  mergeSortHelper(arr, steps, mid, right);
  merge(arr, steps, left, mid, right);
}

export function mergeSortSteps(array: number[]): SortStep[] {
  const arr = [...array];
  const steps: SortStep[] = [];
  mergeSortHelper(arr, steps, 0, arr.length);
  return steps;
}
