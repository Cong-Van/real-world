import AuthorInfo from "../Author/AuthorInfo";
import AuthorAction from "../Author/AuthorAction";

function ArticleBanner({ article, handleFollow, handleFavorite }) {
  return article ? (
    <div className="banner">
      <div className="container">
        <h1>{article.title}</h1>

        <div className="article-meta">
          <AuthorInfo author={article.author} createdAt={article.createdAt} />
          <AuthorAction
            article={article}
            handleFollow={handleFollow}
            handleFavorite={handleFavorite}
          />
        </div>
      </div>
    </div>
  ) : (
    ""
  );
}

export default ArticleBanner;
