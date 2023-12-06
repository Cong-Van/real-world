import { useContext } from "react";
import ArticlePreview from "./ArticlePreview";
import Pagination from "./Pagination";
import { ArticleContext } from "../../store";

function ArticleList({ articles, offset, setOffset }) {
  const { limit, articlesCount } = useContext(ArticleContext);

  const noArticles = articlesCount === 0 && (
    <div className="article-preview">No articles are here... yet.</div>
  );

  return (
    <>
      {articles && (
        <>
          {articles.map((article, index) => (
            <ArticlePreview key={index} article={article} />
          ))}
          {articlesCount > limit && (
            <Pagination offset={offset} setOffset={setOffset} />
          )}
        </>
      )}
      {noArticles}
    </>
  );
}

export default ArticleList;
