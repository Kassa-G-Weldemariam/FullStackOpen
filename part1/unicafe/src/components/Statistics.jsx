import React from "react";
import StatisticLIne from "./StatisticLIne";

const Statistics = (props) => {
  return (
    <div>
      <StatisticLIne text="good" value={props.good} />
      <StatisticLIne text="neutral" value={props.neutral} />
      <StatisticLIne text="bad" value={props.bad} />
      <StatisticLIne text="all" value={props.all} />
      <StatisticLIne text="average" value={props.average} />
      <StatisticLIne text="positive" value={props.positive } sign="%" />
    </div>
  );
};

export default Statistics;
