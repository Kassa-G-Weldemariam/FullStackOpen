import React, { useState } from 'react'

const LoginForm = ({ createUser }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const handleLogin = (e) => {
    e.preventDefault()
    createUser({
      username,
      password,
    })
    setUsername('')
    setPassword('')
  }
  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          <label>
            username
            <input
              type="text"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            password
            <input
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </label>
        </div>
        <button>login</button>
      </form>
    </div>
  )
}

export default LoginForm
