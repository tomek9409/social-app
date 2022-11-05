import axios from "axios";
import React, { useState, useEffect } from "react";
import Post from "../components/Post";
import "./Home.css";

const Home = (props) => {
  const [posts, setPosts] = useState([]);

  const getLatestPosts = () => {
    axios
      .post("http://akademia108.pl/api/social-app/post/latest")
      .then((res) => {
        setPosts(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getNextPosts = () => {
    axios
      .post("https://akademia108.pl/api/social-app/post/older-then", {
        date: posts[posts.length - 1].created_at,
      })
      .then((res) => {
        setPosts(posts.concat(res.data));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getLatestPosts();
  }, []);

  return (
    <div className="home">
      <div className="postList">
        {posts.map((post) => {
          return <Post post={post} key={post.id} />;
        })}
      </div>
      <button className="btn" onClick={getNextPosts}>
        Load more
      </button>
    </div>
  );
};

export default Home;
