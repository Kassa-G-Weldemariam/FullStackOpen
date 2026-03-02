import React from "react";
import Content from "../components/Content";
import Header from "../components/Header";
import Total from "../components/Total";

const Course = (props) => {
  const courses = Object.values(props);
  return (
    <div>
      {courses.map((each) => (
        <Header name={each.name} key={each.id} />
      ))}
      <Content {...props} />
      <Total {...props} />
    </div>
  );
};

export default Course;
