import axios from "axios";
import React, { useState, useEffect } from "react";
import Post from "../components/Post";
import AddPost from "../components/AddPost";
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
  }, [props.user]);

  const getPrevPosts = () => {
    axios
      .post("https://akademia108.pl/api/social-app/post/newer-then", {
        date: posts[0].created_at,
      })
      .then((res) => {
        setPosts(res.data.concat(posts));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="home">
      {!props.user && (
        <div className="join">
          Join to <br /> Social App
        </div>
      )}
      {props.user && <AddPost getPrevPosts={getPrevPosts} />}
      {props.user && (
        <div className="postList">
          {posts.map((post) => {
            return <Post post={post} key={post.id} />;
          })}
        </div>
      )}
      {props.user && (
        <button className="btn" onClick={getNextPosts}>
          Load more
        </button>
      )}
    </div>
  );
};

export default Home;
