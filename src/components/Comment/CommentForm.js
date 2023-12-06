import { Link } from "react-router-dom";

import { useContext, useState } from "react";
import { UserContext } from "../../store";
import { commentAPI } from "../../apis";

function CommentForm({ articleSlug }) {
  const [commentValue, setCommentValue] = useState();

  const { authenticated, currentUser } = useContext(UserContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const comment = { body: commentValue };
    commentAPI.create(articleSlug, { comment });
    setCommentValue("");
  };

  return authenticated ? (
    <form className="card comment-form" onSubmit={handleSubmit}>
      <div className="card-block">
        <textarea
          className="form-control"
          placeholder="Write a comment..."
          name="body"
          rows="3"
          value={commentValue}
          onChange={(e) => setCommentValue(e.target.value)}
          required
        ></textarea>
      </div>
      <div className="card-footer">
        <img
          src={currentUser.image}
          className="comment-author-img"
          alt={currentUser.username}
        />
        <button className="btn btn-sm btn-primary">Post Comment</button>
      </div>
    </form>
  ) : (
    <p style={{ display: "inherit" }}>
      <Link to="/auth?mode=login">Sign in</Link> or{" "}
      <Link to="/auth?mode=register">Sign up</Link> to add comments on this
      article.
    </p>
  );
}

export default CommentForm;
