import React from "react";

const Total = (props) => {
  const courses = Object.values(props);
  const totalExercises = courses.reduce((sum, course) => {
    return (
      sum + course.parts.reduce((partSum, part) => partSum + part.exercises, 0)
    );
  }, 0);

  return (
    <div>
      <h3>total of {totalExercises} exercises </h3>
    </div>
  );
};

export default Total;
