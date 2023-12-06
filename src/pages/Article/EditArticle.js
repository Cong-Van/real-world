import { useParams } from "react-router-dom";
import ArticleForm from "../../components/Article/ArticleForm";
import { useEffect, useState } from "react";
import { articleAPI } from "../../apis";

function EditArticlePage() {
  const [article, setArticle] = useState();

  const { slug } = useParams();

  useEffect(() => {
    const getAndSetArticle = async () => {
      const { article } = await articleAPI.getOne(slug);
      setArticle(article);
    };

    getAndSetArticle();
  }, [slug]);

  return (
    <div className="editor-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-10 offset-md-1 col-xs-12">
            {article && <ArticleForm action="update" article={article} />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditArticlePage;
