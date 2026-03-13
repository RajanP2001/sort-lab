import type { SortStep } from "./sortingTypes";
import { bubbleSortSteps } from "../algorithms/bubbleSort";
import { selectionSortSteps } from "../algorithms/selectionSort";
import { insertionSortSteps } from "../algorithms/insertionSort";
import { mergeSortSteps } from "../algorithms/mergeSort";
import { quickSortSteps } from "../algorithms/quickSort";
import { heapSortSteps } from "../algorithms/heapSort";

export type AlgorithmKey =
  | "bubble"
  | "selection"
  | "insertion"
  | "merge"
  | "quick"
  | "heap";

export interface AlgorithmConfig {
  key: AlgorithmKey;
  label: string;
  description: string;
  generateSteps: (array: number[]) => SortStep[];
}

export const ALGORITHMS: AlgorithmConfig[] = [
  {
    key: "bubble",
    label: "Bubble Sort",
    description:
      "Repeatedly compares adjacent elements and swaps them if they are out of order. Simple, but slow on large arrays.",
    generateSteps: bubbleSortSteps,
  },
  {
    key: "selection",
    label: "Selection Sort",
    description:
      "Scans the unsorted region to find the smallest element, then places it into the next sorted position.",
    generateSteps: selectionSortSteps,
  },
  {
    key: "insertion",
    label: "Insertion Sort",
    description:
      "Builds a sorted region one element at a time by shifting each new element left until it is in the right place.",
    generateSteps: insertionSortSteps,
  },
  {
    key: "merge",
    label: "Merge Sort",
    description:
      "Divides the array in half repeatedly, then merges the halves back together in sorted order.",
    generateSteps: mergeSortSteps,
  },
  {
    key: "quick",
    label: "Quick Sort",
    description:
      "Picks a pivot element and partitions the array so smaller elements go left and larger go right, then recurses on each side.",
    generateSteps: quickSortSteps,
  },
  {
    key: "heap",
    label: "Heap Sort",
    description:
      "Builds a max-heap from the array, then repeatedly extracts the largest element and places it at the end.",
    generateSteps: heapSortSteps,
  },
];
