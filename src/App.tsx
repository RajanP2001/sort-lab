import { useState, useRef } from "react";
import "./App.css";
import { generateRandomArray } from "./utils/generateRandomArray";
import { ALGORITHMS, type AlgorithmKey } from "./engine/algorithmConfig";
import { useSortPlayback } from "./hooks/useSortPlayback";
import BarChart from "./components/BarChart";

const ARRAY_SIZE = 36;
const MIN_VALUE = 5;
const MAX_VALUE = 100;

function App() {
  const initialArray = generateRandomArray(ARRAY_SIZE, MIN_VALUE, MAX_VALUE);
  const [array, setArray] = useState<number[]>(initialArray);
  const originalArrayRef = useRef<number[]>(initialArray);
  const [algorithm, setAlgorithm] = useState<AlgorithmKey>("bubble");

  const {
    isSorting,
    isSorted,
    comparing,
    swapping,
    speed,
    sortDelay,
    setSpeed,
    cancel,
    startSorting,
  } = useSortPlayback();

  const currentAlgorithm = ALGORITHMS.find((a) => a.key === algorithm)!;

  function handleGenerateArray() {
    cancel();
    const newArray = generateRandomArray(ARRAY_SIZE, MIN_VALUE, MAX_VALUE);
    originalArrayRef.current = newArray;
    setArray(newArray);
  }

  function handleReset() {
    cancel();
    setArray([...originalArrayRef.current]);
  }

  function handleStartSorting() {
    startSorting(array, setArray, currentAlgorithm.generateSteps);
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
          <select
            id="algorithm"
            value={algorithm}
            onChange={(e) => {
              cancel();
              setAlgorithm(e.target.value as AlgorithmKey);
            }}
            disabled={isSorting}
          >
            {ALGORITHMS.map((a) => (
              <option key={a.key} value={a.key}>
                {a.label}
              </option>
            ))}
          </select>
          <p className="algorithm-description">{currentAlgorithm.description}</p>
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

      <BarChart
        array={array}
        comparing={comparing}
        swapping={swapping}
        isSorted={isSorted}
      />
    </div>
  );
}

export default App;
