import { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";

import { ArticleContext, UserContext } from "../../store";
import UserInfo from "../../components/User/UserInfo";
import ArticleList from "../../components/Article/ArticleList";
import { profileAPI, articleAPI, userAPI } from "../../apis";
import { getAuthToken } from "../../util/auth";

function ProfilePage() {
  const { isLoading, setIsLoading, limit, setArticlesCount } =
    useContext(ArticleContext);
  const { handleChangeFollow } = useContext(UserContext);

  const [offset, setOffset] = useState(0);
  const [feedDisplay, setFeedDisplay] = useState("author-feed");
  const [articles, setArticles] = useState();
  const [user, setUser] = useState();

  const { username } = useParams();

  const handleFollow = async (username, isFollowing) => {
    await handleChangeFollow(username, isFollowing);
    const updatedUser = { ...user };
    updatedUser.following = !isFollowing;
    setUser(updatedUser);
  };

  const handleChangeFeed = (feedType) => {
    setOffset(0);
    setFeedDisplay(feedType);
  };

  useEffect(() => {
    const getAndSetUser = async () => {
      const token = getAuthToken();
      if (token && token !== "EXPIRED") userAPI.setHeader(token);
      const data = await profileAPI.getOne(username);
      console.log(data);
      setUser(data.profile);
    };

    getAndSetUser();
  }, [username]);

  useEffect(() => {
    async function loadArticles() {
      setIsLoading(true);
      let data;

      if (feedDisplay === "author-feed") {
        const author = username;
        data = await articleAPI.getGolbal({ offset, limit, author });
      }
      if (feedDisplay === "favorited-feed") {
        const favorited = username;
        data = await articleAPI.getGolbal({ offset, limit, favorited });
      }

      setArticles(data.articles);
      setArticlesCount(data.articlesCount);
      setIsLoading(false);
    }

    loadArticles();
  }, [feedDisplay, limit, offset, username, setArticlesCount, setIsLoading]);

  return (
    user && (
      <div className="profile-page">
        <UserInfo user={user} handleFollow={handleFollow} />

        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-10 offset-md-1">
              <div className="articles-toggle">
                <ul className="nav nav-pills outline-active">
                  <li className="nav-item">
                    <Link
                      className={`nav-link ${
                        feedDisplay === "author-feed" ? "active" : ""
                      }`}
                      to=""
                      onClick={() => handleChangeFeed("author-feed")}
                    >
                      My Articles
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className={`nav-link ${
                        feedDisplay === "favorited-feed" ? "active" : ""
                      }`}
                      to=""
                      onClick={() => handleChangeFeed("favorited-feed")}
                    >
                      Favorited Articles
                    </Link>
                  </li>
                </ul>
              </div>

              {isLoading ? (
                <div className="article-preview">Loading article...</div>
              ) : (
                <ArticleList
                  articles={articles}
                  offset={offset}
                  setOffset={setOffset}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    )
  );
}

export default ProfilePage;
