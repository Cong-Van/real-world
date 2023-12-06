import { Link } from "react-router-dom";

import AuthorInfo from "../Author/AuthorInfo";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../store";

function ArticlePreview({ article }) {
  const [favorited, setFavorited] = useState();
  const [favoritesCount, setFavoritesCount] = useState();
  const { handleChangeFavorite } = useContext(UserContext);

  useEffect(() => {
    setFavorited(article.favorited);
    setFavoritesCount(article.favoritesCount);
  }, [article]);

  const handleFavorite = () => {
    handleChangeFavorite(article.slug, article.favorited);
    if (favorited) setFavoritesCount(favoritesCount - 1);
    else setFavoritesCount(favoritesCount + 1);
    setFavorited(!favorited);
  };

  return (
    <div className="article-preview">
      {article ? (
        <>
          <div className="article-meta">
            <AuthorInfo author={article.author} createdAt={article.createdAt} />
            <button
              className={`btn btn-sm pull-xs-right ${
                favorited ? "btn-primary" : "btn-outline-primary"
              }`}
              onClick={handleFavorite}
            >
              <i className="ion-heart"></i> {favoritesCount}
            </button>
          </div>

          <Link to={`/article/${article.slug}`} className="preview-link">
            <h1>{article.title}</h1>
            <p>{article.description}</p>
            <span>Read more...</span>

            <ul className="tag-list">
              {article.tagList.map((tag, index) => (
                <li className="tag-default tag-pill tag-outline" key={index}>
                  {tag}
                </li>
              ))}
            </ul>
          </Link>
        </>
      ) : (
        ""
      )}
    </div>
  );
}

export default ArticlePreview;
