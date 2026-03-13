import { useState } from "react";
import "./App.css";
import { generateRandomArray } from "./utils/generateRandomArray";
import { bubbleSortSteps } from "./algorithms/bubbleSort";
import { sleep } from "./utils/sleep";

const ARRAY_SIZE = 36;
const MIN_VALUE = 5;
const MAX_VALUE = 100;
const SORT_SPEED_MS = 250;

function getBarColor(
  index: number,
  comparing: number[],
  swapping: number[],
  sorted: number[],
): string {
  if (sorted.includes(index)) return "#4ade80"; // green = confirmed sorted
  if (swapping.includes(index)) return "#f87171"; // red = being swapped
  if (comparing.includes(index)) return "#facc15"; // yellow = being compared
  return "#38bdf8"; // blue = default
}

function App() {
  const [array, setArray] = useState<number[]>(() =>
    generateRandomArray(ARRAY_SIZE, MIN_VALUE, MAX_VALUE),
  );
  const [isSorting, setIsSorting] = useState(false);
  const [comparing, setComparing] = useState<number[]>([]);
  const [swapping, setSwapping] = useState<number[]>([]);
  const [sorted, setSorted] = useState<number[]>([]);
  const [isSorted, setIsSorted] = useState(false);

  function handleGenerateArray() {
    setArray(generateRandomArray(ARRAY_SIZE, MIN_VALUE, MAX_VALUE));
    setSorted([]);
    setComparing([]);
    setSwapping([]);
    setIsSorted(false);
  }

  async function handleStartSorting() {
    setIsSorting(true);

    const steps = bubbleSortSteps(array);
    const arr = [...array];
    const sortedIndices: number[] = [];

    for (const step of steps) {
      if (step.type === "compare") {
        setComparing([...step.indices]);
        await sleep(SORT_SPEED_MS);
      } else if (step.type === "swap") {
        setSwapping([...step.indices]);
        const [i, j] = step.indices;
        [arr[i], arr[j]] = [arr[j], arr[i]];
        setArray([...arr]);
        await sleep(SORT_SPEED_MS);
        setSwapping([]);
      } else if (step.type === "markSorted") {
        sortedIndices.push(step.index);
        setSorted([...sortedIndices]);
        setComparing([]);
      }
    }

    setComparing([]);
    setIsSorting(false);
    setIsSorted(true);
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

        <button onClick={handleGenerateArray} disabled={isSorting}>
          Generate New Array
        </button>
        <button onClick={handleStartSorting} disabled={isSorting || isSorted}>
          Start Sorting
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
