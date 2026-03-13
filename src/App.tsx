import { useState, useRef } from "react";
import "./App.css";
import { generateRandomArray } from "./utils/generateRandomArray";
import { bubbleSortSteps } from "./algorithms/bubbleSort";
import { sleep } from "./utils/sleep";

const ARRAY_SIZE = 36;
const MIN_VALUE = 5;
const MAX_VALUE = 100;

function getBarColor(
  index: number,
  comparing: number[],
  swapping: number[],
  sorted: number[],
): string {
  if (sorted.includes(index)) return "#4ade80";
  if (swapping.includes(index)) return "#f87171";
  if (comparing.includes(index)) return "#facc15";
  return "#38bdf8";
}

function App() {
  const initialArray = generateRandomArray(ARRAY_SIZE, MIN_VALUE, MAX_VALUE);
  const [array, setArray] = useState<number[]>(initialArray);
  const originalArrayRef = useRef<number[]>(initialArray);
  const [isSorting, setIsSorting] = useState(false);
  const [isSorted, setIsSorted] = useState(false);
  const [comparing, setComparing] = useState<number[]>([]);
  const [swapping, setSwapping] = useState<number[]>([]);
  const [sorted, setSorted] = useState<number[]>([]);
  const [speed, setSpeed] = useState(50);

  const stopRef = useRef(false);

  function handleGenerateArray() {
    stopRef.current = true;
    const newArray = generateRandomArray(ARRAY_SIZE, MIN_VALUE, MAX_VALUE);
    originalArrayRef.current = newArray;
    setArray(newArray);
    setSorted([]);
    setComparing([]);
    setSwapping([]);
    setIsSorting(false);
    setIsSorted(false);
  }

  function handleReset() {
    stopRef.current = true;
    setArray([...originalArrayRef.current]);
    setSorted([]);
    setComparing([]);
    setSwapping([]);
    setIsSorting(false);
    setIsSorted(false);
  }

  const sortDelay = Math.round(205 - speed * 2);
  async function handleStartSorting() {
    stopRef.current = false;
    setIsSorting(true);
    setIsSorted(false);
    setSorted([]);

    const steps = bubbleSortSteps(array);
    const arr = [...array];
    const sortedIndices: number[] = [];

    for (const step of steps) {
      if (stopRef.current) break;

      if (step.type === "compare") {
        setComparing([...step.indices]);
        await sleep(sortDelay);
      } else if (step.type === "swap") {
        setSwapping([...step.indices]);
        const [i, j] = step.indices;
        [arr[i], arr[j]] = [arr[j], arr[i]];
        setArray([...arr]);
        await sleep(sortDelay);
        setSwapping([]);
      } else if (step.type === "markSorted") {
        sortedIndices.push(step.index);
        setSorted([...sortedIndices]);
        setComparing([]);
      }
    }

    if (!stopRef.current) {
      setComparing([]);
      setIsSorting(false);
      setIsSorted(true);
    }
  }

  return (
    <div className="app">
      <header className="app__header">
        <h1>Sort Lab</h1>
        <p className="app__subtitle">
          Learn how sorting algorithms work by watching each step.
        </p>
      </header>

      <section className="controls">
        <div className="control-group">
          <label htmlFor="algorithm">Algorithm</label>
          <select id="algorithm" disabled={isSorting}>
            <option>Bubble Sort</option>
          </select>
        </div>

        <div className="control-group">
          <label htmlFor="speed">Delay: {sortDelay}ms</label>
          <input
            id="speed"
            type="range"
            min={1}
            max={100}
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            disabled={isSorting}
          />
        </div>

        <button onClick={handleGenerateArray} disabled={isSorting}>
          Generate New Array
        </button>
        <button onClick={handleStartSorting} disabled={isSorting || isSorted}>
          Start Sorting
        </button>
        <button onClick={handleReset} disabled={!isSorting && !isSorted}>
          Reset
        </button>
      </section>

      <section className="visualizer">
        {array.map((value, index) => (
          <div key={index} className="bar-wrapper">
            <div
              className="bar"
              style={{
                height: `${value * 3}px`,
                background: getBarColor(index, comparing, swapping, sorted),
              }}
              title={`Value: ${value}`}
            />
          </div>
        ))}
      </section>
    </div>
  );
}

export default App;
