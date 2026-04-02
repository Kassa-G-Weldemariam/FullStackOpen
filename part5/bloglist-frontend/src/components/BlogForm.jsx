import React from "react";

const BlogForm = (props) => {
  return (
    <div>
      <h1>create new note</h1>
      <form onSubmit={props.onSubmit}>
        <div>
          <label>
            {" "}
            title:
            <input
              type="text"
              value={props.title}
              onChange={(e) => props.setTitle(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            {" "}
            author:
            <input
              type="text"
              value={props.author}
              onChange={(e) => props.setAuthor(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            url:
            <input
              type="text"
              value={props.url}
              onChange={(e) => props.setUrl(e.target.value)}
            />
          </label>
        </div>
        <button>create</button>
      </form>
    </div>
  );
};

export default BlogForm;
