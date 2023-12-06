import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { articleAPI } from "../../apis";

function ArticleForm({ action, article }) {
  const [errors, setErrors] = useState();
  const [articleData, setArticleData] = useState({
    title: "",
    description: "",
    body: "",
    tagList: [],
  });
  const tagRef = useRef();

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setArticleData({ ...articleData, [e.target.name]: e.target.value || "" });
  };

  const handleAddTag = (e) => {
    if (e.key === "Enter" && tagRef.current.value.trim() !== "") {
      setArticleData({
        ...articleData,
        tagList: [...articleData.tagList, tagRef.current.value],
      });
      tagRef.current.value = "";
    }
  };

  const handleRemoveTag = (index) => {
    const updatedArticleData = { ...articleData };
    updatedArticleData.tagList.splice(index, 1);
    setArticleData(updatedArticleData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(articleData);
    let data;
    if (action === "create")
      data = await articleAPI.create({ article: articleData });
    else data = await articleAPI.update(article.slug, { article: articleData });
    if (data.errors) {
      const errors = Object.entries(data.errors).map((error) =>
        error.join(" ")
      );
      setErrors(errors);
    }

    if (data.article) navigate(`/article/${data.article.slug}`);
    else console.log(data);
  };

  useEffect(() => {
    if (article) {
      const articleInit = {
        title: article.title,
        description: article.description,
        body: article.body,
        tagList: article.tagList,
      };
      setArticleData(articleInit);
    }
  }, [article]);

  return (
    <form
      onSubmit={handleSubmit}
      onKeyDown={(e) => {
        if (e.key === "Enter") e.preventDefault();
      }}
    >
      {errors && (
        <ul>
          {Object.values(errors).map((err) => (
            <li key={err}>{err}</li>
          ))}
        </ul>
      )}
      <fieldset>
        <fieldset className="form-group">
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="Article Title"
            name="title"
            value={articleData.title}
            onChange={handleInputChange}
            required
          />
        </fieldset>
        <fieldset className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="What's this article about?"
            name="description"
            value={articleData.description}
            onChange={handleInputChange}
            required
          />
        </fieldset>
        <fieldset className="form-group">
          <textarea
            className="form-control"
            rows="8"
            placeholder="Write your article (in markdown)"
            name="body"
            value={articleData.body}
            onChange={handleInputChange}
            required
          ></textarea>
        </fieldset>
        <fieldset className="form-group">
          <input
            ref={tagRef}
            type="text"
            className="form-control"
            name="tag"
            placeholder="Enter tags"
            onKeyDown={handleAddTag}
          />
          <div className="tag-list" name="tag-list">
            {articleData.tagList.map((tag, index) => (
              <span className="tag-default tag-pill" key={index}>
                <i
                  className="ion-close-round"
                  onClick={() => handleRemoveTag(index)}
                ></i>{" "}
                {tag}
              </span>
            ))}
          </div>
        </fieldset>
        <button className="btn btn-lg pull-xs-right btn-primary" type="submit">
          Publish Article
        </button>
      </fieldset>
    </form>
  );
}

export default ArticleForm;
