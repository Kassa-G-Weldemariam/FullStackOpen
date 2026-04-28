import React from 'react'

const Notification = ({ SuccessMessage, errorMessage }) => {
  return (
    <div>
      {SuccessMessage ? (
        <div className="success">{SuccessMessage}</div>
      ) : (
        <div className="error">{errorMessage}</div>
      )}
    </div>
  )
}

export default Notification
