import React from "react";
import Part from "./Part";

const Content = (props) => {
  const courses = Object.values(props);
  // console.log(course)

  return (
    <div>
      {/* <Part course={courses}/> */}
      {courses.map((course) =>
        course.parts.map((part) => (
          <Part part={part.name} exercise={part.exercises} key={part.id} />
        )),
      )}
    </div>
  );
};

export default Content;
