import ArticleForm from "../../components/Article/ArticleForm";

function NewArticlePage() {
  return (
    <div className="editor-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-10 offset-md-1 col-xs-12">
            <ArticleForm action="create" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewArticlePage;
