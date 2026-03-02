import React from "react";

const Persons = ({ name, number, onClick }) => {
  return (
    <div>
      <ul>
        <li>
          {name} {number} <button onClick={onClick}>delete</button>
        </li>
      </ul>
    </div>
  );
};

export default Persons;
