import { useState, useRef } from "react";
import { sleep } from "../utils/sleep";
import type { SortStep } from "../engine/sortingTypes";

function computeDelay(speed: number): number {
  return 505 - speed * 5;
}

export function useSortPlayback() {
  const [isSorting, setIsSorting] = useState(false);
  const [isSorted, setIsSorted] = useState(false);
  const [comparing, setComparing] = useState<number[]>([]);
  const [swapping, setSwapping] = useState<number[]>([]);
  const [speed, setSpeedState] = useState(50);

  const stopRef = useRef(false);
  const speedRef = useRef(computeDelay(50));

  const sortDelay = computeDelay(speed);

  function setSpeed(val: number) {
    setSpeedState(val);
    speedRef.current = computeDelay(val);
  }

  function cancel() {
    stopRef.current = true;
    setComparing([]);
    setSwapping([]);
    setIsSorting(false);
    setIsSorted(false);
  }

  async function startSorting(
    array: number[],
    setArray: (arr: number[]) => void,
    generateSteps: (arr: number[]) => SortStep[],
  ) {
    stopRef.current = false;
    setIsSorting(true);
    setIsSorted(false);

    const steps = generateSteps(array);
    const arr = [...array];

    for (const step of steps) {
      if (stopRef.current) break;

      if (step.type === "compare") {
        setComparing([...step.indices]);
        await sleep(speedRef.current);
      } else if (step.type === "swap") {
        setSwapping([...step.indices]);
        const [i, j] = step.indices;
        [arr[i], arr[j]] = [arr[j], arr[i]];
        setArray([...arr]);
        await sleep(speedRef.current);
        setSwapping([]);
      } else if (step.type === "overwrite") {
        setSwapping([step.index]);
        arr[step.index] = step.value;
        setArray([...arr]);
        await sleep(speedRef.current);
        setSwapping([]);
      }
    }

    if (!stopRef.current) {
      setComparing([]);
      setIsSorting(false);
      setIsSorted(true);
    }
  }

  return {
    isSorting,
    isSorted,
    comparing,
    swapping,
    speed,
    sortDelay,
    setSpeed,
    cancel,
    startSorting,
  };
}
