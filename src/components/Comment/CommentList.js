import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { commentAPI } from "../../apis";
import { UserContext } from "../../store";

function CommentList({ articleSlug }) {
  const [comments, setComments] = useState();

  const { currentUser } = useContext(UserContext);

  const handleDelete = async (commentId) => {
    const confirm = window.confirm("Are you sure to delete comment?");

    if (confirm) {
      await commentAPI.delete(articleSlug, commentId);
    }
  };

  const formatDate = (date) => {
    const formateDate = new Date(date);
    return formateDate.toLocaleDateString();
  };

  const getAndSetComments = async () => {
    if (articleSlug) {
      const data = await commentAPI.getByArticleSlug(articleSlug);
      setComments(data.comments);
    }
  };

  getAndSetComments();

  return comments?.map((comment, index) => (
    <div className="card" key={index}>
      <div className="card-block">
        <p className="card-text">{comment.body}</p>
      </div>
      <div className="card-footer">
        <Link
          to={`/user/${comment.author.username}`}
          className="comment-author"
        >
          <img
            src={comment.author.image}
            className="comment-author-img"
            alt={comment.author.username}
          />
        </Link>
        &nbsp;
        <Link
          to={`/user/${comment.author.username}`}
          className="comment-author"
        >
          {comment.author.username}
        </Link>
        <span className="date-posted">{formatDate(comment.createdAt)}</span>
        {comment.author.username === currentUser.username && (
          <span
            className="mod-options"
            onClick={() => handleDelete(comment.id)}
          >
            <i className="ion-trash-a"></i>
          </span>
        )}
      </div>
    </div>
  ));
}

export default CommentList;
