import { useNavigate } from "react-router-dom";
import { useState } from "react";

import Context from "./Context";
import { profileAPI, articleAPI } from "../../apis";

const Provider = ({ children }) => {
  const navigate = useNavigate();

  const [authenticated, setAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState("");

  const handleChangeFollow = async (username, isFollowing) => {
    if (!authenticated) {
      navigate("/auth");
      return;
    }

    if (isFollowing) await profileAPI.unFollow(username);
    else await profileAPI.follow(username);
  };

  const handleChangeFavorite = async (articleSlug, isFavorited) => {
    if (!authenticated) {
      navigate("/auth");
      return;
    }
    if (isFavorited) {
      await articleAPI.unfavorite(articleSlug);
    } else {
      await articleAPI.favorite(articleSlug);
    }
  };

  return (
    <Context.Provider
      value={{
        authenticated,
        setAuthenticated,
        currentUser,
        setCurrentUser,
        handleChangeFollow,
        handleChangeFavorite,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default Provider;
