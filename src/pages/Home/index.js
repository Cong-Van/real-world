import { Link } from "react-router-dom";
import { useState, useContext, useEffect } from "react";

import Banner from "../../components/Home/Banner";
import ArticleList from "../../components/Article/ArticleList";
import TagList from "../../components/Tag/TagList";
import { ArticleContext, TagContext, UserContext } from "../../store";
import { articleAPI, tagAPI, userAPI } from "../../apis";
import { getAuthToken } from "../../util/auth";

function HomePage() {
  const { isLoading, setIsLoading, limit, setArticlesCount } =
    useContext(ArticleContext);
  const { tag, setTag } = useContext(TagContext);
  const { authenticated } = useContext(UserContext);

  const [offset, setOffset] = useState(0);
  const [feedDisplay, setFeedDisplay] = useState();
  const [articles, setArticles] = useState();
  const [tags, setTags] = useState();

  const handleChangeFeed = (feedType) => {
    setOffset(0);
    setTag(null);
    setFeedDisplay(feedType);
  };

  useEffect(() => {
    const token = getAuthToken();
    if (!token || token === "EXPIRED") setFeedDisplay("global-feed");
    else setFeedDisplay("your-feed");

    setTag("");
  }, []);

  useEffect(() => {
    async function loadArticles() {
      setIsLoading(true);
      let data;
      if (feedDisplay === "your-feed")
        data = await articleAPI.getFeed({ offset, limit });
      if (feedDisplay === "global-feed")
        data = await articleAPI.getGolbal({ offset, limit });
      if (feedDisplay === "tag-feed")
        data = await articleAPI.getGolbal({ offset, limit, tag });
      if (!data?.articles) return;

      console.log(feedDisplay, data);
      setArticles(data.articles);
      setArticlesCount(data.articlesCount);
      setIsLoading(false);
    }

    loadArticles();
  }, [
    authenticated,
    feedDisplay,
    offset,
    limit,
    tag,
    setArticlesCount,
    setIsLoading,
  ]);

  useEffect(() => {
    async function getTags() {
      try {
        const data = await tagAPI.all();
        setTags(data.tags);
      } catch (err) {
        console.log(err);
      }
    }
    getTags();
  }, []);

  return (
    <div className="home-page">
      <Banner />

      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            <div className="feed-toggle">
              <ul className="nav nav-pills outline-active">
                <li className="nav-item">
                  {authenticated ? (
                    <Link
                      className={`nav-link ${
                        feedDisplay === "your-feed" ? "active" : ""
                      }`}
                      to="/"
                      onClick={() => handleChangeFeed("your-feed")}
                    >
                      Your Feed
                    </Link>
                  ) : (
                    ""
                  )}
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${
                      feedDisplay === "global-feed" ? "active" : ""
                    }`}
                    to="/"
                    onClick={() => handleChangeFeed("global-feed")}
                  >
                    Global Feed
                  </Link>
                </li>
                {tag && (
                  <li className="nav-item">
                    <Link
                      className={`nav-link ${
                        feedDisplay === "tag-feed" ? "active" : ""
                      }`}
                      to=""
                    >
                      #{tag}
                    </Link>
                  </li>
                )}
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
          <div className="col-md-3">
            <div className="sidebar">
              <p>Popular Tags</p>

              <TagList
                tags={tags}
                setFeedDisplay={setFeedDisplay}
                setOffset={setOffset}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
