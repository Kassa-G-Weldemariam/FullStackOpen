import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Toglable from './components/Toglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')
  const [SuccessMessage, setSuccessMessage] = useState('')
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])
  useEffect(() => {
    const userAsJson = window.localStorage.getItem('userInLocal')
    if (userAsJson) {
      const user = JSON.parse(userAsJson)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async ({ username, password }) => {
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('userInLocal', JSON.stringify(user))
      setUser(user)
      blogService.setToken(user.token)
    } catch {
      setErrorMessage('Wrong username or password')
      setTimeout(() => {
        setErrorMessage('')
      }, 5000)
    }
  }
  const handleLogOut = (e) => {
    e.preventDefault()
    window.localStorage.removeItem('userInLocal')
    setUser(null)
  }
  const handleBlog = async (newBlog) => {
    try {
      blogFormRef.current.toggleVisibility()
      const blog = await blogService.create(newBlog)
      setBlogs(blogs.concat(blog))
      setSuccessMessage(`a new blog ${blog.title} by ${blog.author} added`)
      setTimeout(() => {
        setSuccessMessage('')
      }, 5000)
    } catch {
      setErrorMessage('unable to create blog!')
      setTimeout(() => {
        setErrorMessage('')
      }, 5000)
    }
  }
  const handleLike = async ({ likes, id }) => {
    const updatedBlog = await blogService.updateLike({ likes, id })
    setBlogs(blogs.map((blog) => (blog.id === id ? updatedBlog : blog)))
  }
  const handleDelete = async (id) => {
    await blogService.deleteBlog(id, user.token)
    setBlogs(blogs.filter((blog) => blog.id !== id))
  }

  return (
    <div>
      {user && (
        <div>
          <h1>blogs</h1>
          {SuccessMessage || errorMessage ? (
            <Notification
              SuccessMessage={SuccessMessage}
              errorMessage={errorMessage}
            />
          ) : (
            ''
          )}
          <div>
            {user.username} longed in
            <button onClick={handleLogOut}>logout</button>
          </div>
          <Toglable ref={blogFormRef}>
            <BlogForm createBlog={handleBlog} />
          </Toglable>
          {blogs
            .slice()
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                handleLike={handleLike}
                loggedInName={user.name}
                handleDelete={handleDelete}
              />
            ))}
        </div>
      )}
      {!user && (
        <div>
          <h1>Log in to Application</h1>
          {errorMessage ? <Notification errorMessage={errorMessage} /> : ''}
          <LoginForm createUser={handleLogin} />
        </div>
      )}
    </div>
  )
}

export default App
