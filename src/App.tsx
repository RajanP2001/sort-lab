import { useState } from "react";
import "./App.css";
import { generateRandomArray } from "./utils/generateRandomArray";

const ARRAY_SIZE = 36;
const MIN_VALUE = 5;
const MAX_VALUE = 100;

function App() {
  const [array, setArray] = useState<number[]>(() =>
    generateRandomArray(ARRAY_SIZE, MIN_VALUE, MAX_VALUE),
  );

  function handleGenerateArray() {
    setArray(generateRandomArray(ARRAY_SIZE, MIN_VALUE, MAX_VALUE));
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
          <select id="algorithm" disabled>
            <option>Bubble Sort</option>
          </select>
        </div>

        <button onClick={handleGenerateArray}>Generate New Array</button>
        <button disabled>Start Sorting</button>
      </section>

      <section className="visualizer">
        {array.map((value, index) => (
          <div key={index} className="bar-wrapper">
            <div
              className="bar"
              style={{ height: `${value * 3}px` }}
              title={`Value: ${value}`}
            />
          </div>
        ))}
      </section>
    </div>
  );
}

export default App;
