import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";

import { UserContext } from "../../store";
import { articleAPI } from "../../apis";

function AuthorAction({ article, handleFollow, handleFavorite }) {
  const [isLoadingFol, setIsloadingFol] = useState(false);
  const [isLoadingFavor, setIsloadingFavor] = useState(false);
  const { currentUser } = useContext(UserContext);

  const navigate = useNavigate();

  const handleFollowUser = async () => {
    setIsloadingFol(true);
    await handleFollow(article.author.username, article.author.following);
    setIsloadingFol(false);
  };

  const handleFavoriteArticle = async () => {
    setIsloadingFavor(true);
    await handleFavorite(article.slug, article.favorited);
    setIsloadingFavor(false);
  };

  const handleDelete = async () => {
    const proceed = window.confirm("Are you sure to delete?");

    if (proceed) {
      await articleAPI.delete(article.slug);
      navigate("/");
    }
  };

  return currentUser?.username !== article.author.username ? (
    <>
      <button
        className={`btn btn-sm ${
          article.author.following ? "btn-secondary" : "btn-outline-secondary"
        }`}
        onClick={handleFollowUser}
        disabled={isLoadingFol}
      >
        <i className="ion-plus-round"></i>
        &nbsp;
        {`${article.author.following ? "Unfollow" : "Follow"} ${
          article.author.username
        }`}
      </button>
      &nbsp;
      <button
        className={`btn btn-sm ${
          article.favorited ? "btn-primary" : "btn-outline-primary"
        }`}
        onClick={handleFavoriteArticle}
        disabled={isLoadingFavor}
      >
        <i className="ion-heart"></i>
        &nbsp; {article.favorited ? "Unfavorite Article" : "Favorite Article"}
        <span className="counter">({article.favoritesCount})</span>
      </button>
    </>
  ) : (
    <>
      <Link
        className="btn btn-sm btn-outline-secondary"
        to={`/article/${article.slug}/edit`}
      >
        <i className="ion-edit"></i> Edit Article
      </Link>
      <button className="btn btn-sm btn-outline-danger" onClick={handleDelete}>
        <i className="ion-trash-a"></i> Delete Article
      </button>
    </>
  );
}

export default AuthorAction;
