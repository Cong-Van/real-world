import { Link } from "react-router-dom";

function AuthorInfo({ author, createdAt }) {
  const date = new Date(createdAt);
  // dateTransfer = dateTransfer.toLocaleDateString();
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(date);

  return (
    <>
      <Link to={`/user/${author.username}`}>
        <img src={author.image} alt={author.username} />
      </Link>
      <div className="info">
        <Link to={`/user/${author.username}`} className="author">
          {author.username}
        </Link>
        <span className="date">{formattedDate}</span>
      </div>
    </>
  );
}

export default AuthorInfo;
