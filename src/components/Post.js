import React, { useState } from "react";
import "./Post.css";
import axios from "axios";

const Post = (props) => {
  const [likeCount, setLikeCount] = useState(props.post.likes.length);
  const [doesUserLiked, setDoesUserLiked] = useState(
    props.post.likes.filter((like) => like.username === props.user?.username)
      .length !== 0
  );

  const likePost = (id, isLiked) => {
    axios
      .post(
        "https://akademia108.pl/api/social-app/post/" +
          (isLiked ? "dislike" : "like"),
        {
          post_id: id,
        }
      )
      .then(() => {
        setLikeCount(likeCount + (isLiked ? -1 : 1));
        setDoesUserLiked(!isLiked);
      });

    console.log(isLiked);
  };
  return (
    <div className="post">
      <div className="postHeader">
        <img src={props.post.user.avatar_url} alt={props.post.user.username} />
        <div className="postUser">{props.post.user.username.toUpperCase()}</div>
      </div>
      <div className="postInfo">
        <div className="postContent">{props.post.content}</div>
      </div>
      <div className="postBottom">
        <button
          className="btn"
          onClick={() => likePost(props.post.id, doesUserLiked)}
        >
          {doesUserLiked ? `Dislike` : "Like"}
        </button>

        <div className="postCreated">
          {props.post.user.created_at.slice(0, 10).replaceAll("-", "/")}
        </div>
      </div>
    </div>
  );
};

export default Post;
