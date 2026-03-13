import "./App.css";

const sampleBars = [80, 140, 60, 180, 110, 95, 150, 70, 130, 50, 165, 100];

function App() {
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

        <button disabled>Generate New Array</button>
        <button disabled>Start Sorting</button>
      </section>

      <section className="visualizer">
        {sampleBars.map((value, index) => (
          <div key={index} className="bar-wrapper">
            <div
              className="bar"
              style={{ height: `${value * 2}px` }}
              title={`Value: ${value}`}
            />
            <span className="bar-label">{value}</span>
          </div>
        ))}
      </section>
    </div>
  );
}

export default App;
