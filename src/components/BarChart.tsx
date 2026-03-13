import type { FC } from "react";

interface Props {
  array: number[];
  comparing: number[];
  swapping: number[];
  isSorted: boolean;
}

function getBarColor(
  index: number,
  comparing: number[],
  swapping: number[],
  isSorted: boolean,
): string {
  if (isSorted) return "#4ade80";
  if (swapping.includes(index)) return "#ef4444";
  if (comparing.includes(index)) return "#fbbf24";
  return "#38bdf8";
}

const BarChart: FC<Props> = ({ array, comparing, swapping, isSorted }) => {
  return (
    <>
      <section className="visualizer">
        {array.map((value, index) => (
          <div key={index} className="bar-wrapper">
            <div
              className="bar"
              style={{
                height: `${value * 3}px`,
                background: getBarColor(index, comparing, swapping, isSorted),
              }}
              title={`Value: ${value}`}
            />
          </div>
        ))}
      </section>

      <div className="legend">
        <div className="legend__item">
          <span className="legend__dot" style={{ background: "#fbbf24" }} />
          <span>Comparing</span>
        </div>
        <div className="legend__item">
          <span className="legend__dot" style={{ background: "#ef4444" }} />
          <span>Swapping</span>
        </div>
        <div className="legend__item">
          <span className="legend__dot" style={{ background: "#4ade80" }} />
          <span>Sorted</span>
        </div>
      </div>
    </>
  );
};

export default BarChart;
