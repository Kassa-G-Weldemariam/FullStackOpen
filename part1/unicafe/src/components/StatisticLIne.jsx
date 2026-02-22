import React from "react";

const StatisticLIne = (props) => {
  return (
    <div>
      <table style={{ width: "7%" }}>
        <tbody>
          <tr>
            <td>{props.text}</td>
            <td style={{ textAlign: "right" }}>
              {props.value}
              {props.sign}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default StatisticLIne;
