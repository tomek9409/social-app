import "./FollowRecommendations.css";
import axios from "axios";
import { useEffect, useState } from "react";

const FollowRecommendations = (props) => {
  const [recommendations, setRecommendations] = useState([]);

  const getRecommendations = () => {
    axios
      .post("https://akademia108.pl/api/social-app/follows/recommendations")
      .then((res) => {
        setRecommendations(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const follow = (id) => {
    axios
      .post("https://akademia108.pl/api/social-app/follows/follow", {
        leader_id: id,
      })
      .then(() => {
        props.getLatestPosts();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getRecommendations();
  }, [props.posts]);

  return (
    <div className="recommendations">
      {recommendations.map((recommendation) => {
        return (
          <div className="recommendation" key={recommendation.id}>
            <div className="recommendationHeader">
              <img
                src={recommendation.avatar_url}
                alt={recommendation.username}
              />
              <h2>{recommendation.username}</h2>
            </div>
            <div className="follow">
              <button className="btn" onClick={() => follow(recommendation.id)}>
                Follow
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default FollowRecommendations;
