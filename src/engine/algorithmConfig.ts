import type { SortStep } from "./sortingTypes";
import { bubbleSortSteps } from "../algorithms/bubbleSort";
import { selectionSortSteps } from "../algorithms/selectionSort";
import { insertionSortSteps } from "../algorithms/insertionSort";

export type AlgorithmKey = "bubble" | "selection" | "insertion";

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
];
