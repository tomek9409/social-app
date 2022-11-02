import React from "react";
import "./Post.css";

const Post = (props) => {
  console.log(props.post.user);
  return (
    <div className="post">
      <div className="postAvatar">
        <img src={props.post.user.avatar_url} alt={props.post.user.username} />
      </div>
      <div className="postInfo">
        <div className="postUser">{props.post.user.username.toUpperCase()}</div>
        <div className="postCreated">
          {props.post.user.created_at.slice(0, 10).replaceAll("-", ".")}
        </div>
      </div>
    </div>
  );
};

export default Post;
