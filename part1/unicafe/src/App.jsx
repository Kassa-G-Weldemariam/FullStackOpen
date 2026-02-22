import { useState } from "react";
import Statistics from "./components/Statistics";
import Button from "./components/Button";

function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const all = bad + good + neutral;
  const result = good - bad;
  const average = all !== 0 ? result / all : 0;

  const positive = all !== 0 ? good / all : 0;
  const objProb = {
    good: good,
    neutral: neutral,
    bad: bad,
    all: all,
    average: average,
    positive: positive * 100,
  };

  return (
    <>
      <h1>Give feedback</h1>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Button onClick={() => setGood(good + 1)} text="good" />
        <Button onClick={() => setNeutral(neutral + 1)} text="neutral" />
        <Button onClick={() => setBad(bad + 1)} text="bad" />
      </div>

      <h1>Statistics</h1>
      {all !== 0 ? <Statistics {...objProb} /> : "No feedback given"}
    </>
  );
}

export default App;
