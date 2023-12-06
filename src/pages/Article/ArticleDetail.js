import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

import ArticleBanner from "../../components/Article/ArticleBanner";
import ArticleItem from "../../components/Article/ArticleItem";
import CommentForm from "../../components/Comment/CommentForm";
import CommentList from "../../components/Comment/CommentList";
import { articleAPI, userAPI } from "../../apis";
import { UserContext } from "../../store";
import { getAuthToken } from "../../util/auth";

function ArticleDetailPage() {
  const { handleChangeFollow, handleChangeFavorite } = useContext(UserContext);
  const [article, setArticle] = useState();

  const { slug } = useParams();

  const handleFollow = async (username, isFollowing) => {
    await handleChangeFollow(username, isFollowing);
    // Update State
    const updatedArticle = { ...article };
    updatedArticle.author.following = !isFollowing;
    setArticle(updatedArticle);
  };

  const handleFavorite = async (articleSlug, isFavorited) => {
    await handleChangeFavorite(articleSlug, isFavorited);
    // Update State
    const updatedArticle = { ...article };
    if (!isFavorited) {
      updatedArticle.favoritesCount += 1;
    } else {
      updatedArticle.favoritesCount -= 1;
    }
    updatedArticle.favorited = !isFavorited;
    setArticle(updatedArticle);
  };

  useEffect(() => {
    const getAndSetArticle = async () => {
      const token = getAuthToken();
      if (token && token !== "EXPIRED") userAPI.setHeader(token);
      const data = await articleAPI.getOne(slug);
      setArticle(data.article);
    };

    getAndSetArticle();
  }, [slug]);

  return (
    <div className="article-page">
      {article ? (
        <>
          <ArticleBanner
            article={article}
            handleFollow={handleFollow}
            handleFavorite={handleFavorite}
          />
          <div className="container page">
            <ArticleItem
              article={article}
              handleFollow={handleFollow}
              handleFavorite={handleFavorite}
            />

            <div className="row">
              <div className="col-xs-12 col-md-8 offset-md-2">
                <CommentForm articleSlug={slug} />
                <CommentList articleSlug={slug} />
              </div>
            </div>
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
}

export default ArticleDetailPage;
