import { useState } from 'react'

const Blog = ({ blog, handleLike, loggedInName, handleDelete }) => {
  const [showDetails, setShowDetails] = useState(false)
  const handleClick = (e) => {
    e.preventDefault()
    handleLike({ likes: blog.likes + 1, id: blog.id })
  }
  const handleDeleteBlog = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      handleDelete(blog.id)
    }
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }
  return (
    <div style={blogStyle}>
      {showDetails ? (
        <div>
          <div>
            {blog.title} {blog.author}
            <button onClick={() => setShowDetails(false)}>hide</button>{' '}
          </div>
          <div>{blog.url}</div>
          <div>
            likes {blog.likes} <button onClick={handleClick}>like</button>
          </div>
          <div>{blog.user.name} </div>
          {loggedInName === blog.user.name ? (
            <button onClick={handleDeleteBlog}>remove</button>
          ) : (
            ''
          )}
        </div>
      ) : (
        <div>
          {blog.title} {blog.author}{' '}
          <button onClick={() => setShowDetails(true)}>view</button>
        </div>
      )}
    </div>
  )
}

export default Blog
