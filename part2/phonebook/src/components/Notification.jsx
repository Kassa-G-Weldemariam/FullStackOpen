import React from "react";

const Notification = ({ successMes, errorMes }) => {
  return (
    <>
      {successMes ? (
        <div className="success message">{successMes}</div>
      ) : (
        <div className="error message">{errorMes}</div>
      )}
    </>
  );
};

export default Notification;
