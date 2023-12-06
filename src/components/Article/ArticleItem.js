import AuthorInfo from "../Author/AuthorInfo";
import AuthorAction from "../Author/AuthorAction";

function ArticleItem({ article, handleFollow, handleFavorite }) {
  return article ? (
    <>
      <div className="row article-content">
        <div className="col-md-12">
          <p>{article.body}</p>
          {/* <h2 id="introducing-ionic">{article.title}</h2> */}
          <p>{article.summary}</p>
          <ul className="tag-list">
            {article.tagList.map((tag, index) => (
              <li className="tag-default tag-pill tag-outline" key={index}>
                {tag}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <hr />

      <div className="article-actions">
        <div className="article-meta">
          <AuthorInfo author={article.author} createdAt={article.createdAt} />
          <AuthorAction
            article={article}
            handleFollow={handleFollow}
            handleFavorite={handleFavorite}
          />
        </div>
      </div>
    </>
  ) : (
    ""
  );
}

export default ArticleItem;
