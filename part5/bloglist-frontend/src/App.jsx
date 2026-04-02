import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [SuccessMessage, setSuccessMessage] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);
  useEffect(() => {
    const userAsJson = window.localStorage.getItem("userInLocal");
    if (userAsJson) {
      const user = JSON.parse(userAsJson);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("userInLocal", JSON.stringify(user));
      setUser(user);
      blogService.setToken(user.token);
      setUsername("");
      setPassword("");
    } catch (error) {
      setErrorMessage("Wrong username or password");
      setTimeout(() => {
        setErrorMessage("");
      }, 5000);
    }
  };
  const handleLogOut = (e) => {
    e.preventDefault();
    window.localStorage.removeItem("userInLocal");
    setUser(null);
  };
  const handleBlog = async (e) => {
    e.preventDefault();
    try {
      const newBlog = {
        title,
        author,
        url,
      };
      const blog = await blogService.create(newBlog);
      setBlogs(blogs.concat(blog));
      setSuccessMessage(`a new blog ${blog.title} by ${blog.author} added`);
      setTitle("");
      setAuthor("");
      setUrl("");
      setTimeout(() => {
        setSuccessMessage("");
      }, 5000);
    } catch (error) {
      setErrorMessage("unable to create blog!");
      setTimeout(() => {
        setErrorMessage("");
      }, 5000);
    }
  };

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
            ""
          )}
          <div>
            {user.username} longed in
            <button onClick={handleLogOut}>logout</button>
          </div>
          <div>
            <BlogForm
              onSubmit={handleBlog}
              title={title}
              setTitle={setTitle}
              author={author}
              setAuthor={setAuthor}
              url={url}
              setUrl={setUrl}
            />
          </div>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      )}
      {!user && (
        <div>
          <h1>Log in to Application</h1>
          {errorMessage ? <Notification errorMessage={errorMessage} /> : ""}
          <LoginForm
            onSubmit={handleLogin}
            username={username}
            password={password}
            setUsername={setUsername}
            setPassword={setPassword}
          />
        </div>
      )}
    </div>
  );
};

export default App;
