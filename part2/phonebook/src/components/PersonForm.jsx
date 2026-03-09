import React from "react";

const PersonForm = (props) => {
  return (
    <div>
      <form onSubmit={props.onSubmit}>
        <div>
          Name : <input value={props.newName} onChange={props.handleNewName} />
        </div>
        <div>
          Number:{" "}
          <input
            value={props.newNumber}
            onChange={props.handleNewNumber}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
};

export default PersonForm;
