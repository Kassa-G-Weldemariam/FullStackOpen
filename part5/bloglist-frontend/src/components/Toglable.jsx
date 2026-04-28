import React, { useImperativeHandle, useState } from 'react'

const Toglable = ({ children, ref }) => {
  const [visible, setVisible] = useState(false)
  const toggleVisibility = () => {
    setVisible(!visible)
  }
  useImperativeHandle(ref, () => {
    return { toggleVisibility }
  })
  return (
    <div>
      <div>
        {visible ? (
          <div>
            {children}
            <button onClick={toggleVisibility}>cancel</button>
          </div>
        ) : (
          <button onClick={toggleVisibility}>create new blog</button>
        )}
      </div>
    </div>
  )
}

export default Toglable
