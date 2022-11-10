import React, { useState } from "react";
import axios from "axios";
import "./AddPost.css";

const AddPost = (props) => {
  const [postContent, setPostContent] = useState("");

  const addPost = (e) => {
    e.preventDefault();

    if (!postContent) {
      return;
    }

    axios
      .post("https://akademia108.pl/api/social-app/post/add", {
        content: postContent,
      })
      .then(() => {
        props.getPrevPosts();
        setPostContent("");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="addPost">
      <form onSubmit={addPost}>
        <textarea
          placeholder="What's happening?"
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
        ></textarea>
        <button className="btn">Add post</button>
      </form>
    </div>
  );
};

export default AddPost;
