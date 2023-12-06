import { useContext } from "react";
import { Link } from "react-router-dom";
import { ArticleContext } from "../../store";

function Pagaination({ offset, setOffset }) {
  const { articlesCount, limit } = useContext(ArticleContext);
  return (
    <ul className="pagination">
      {Array(Math.ceil(articlesCount / limit))
        .fill()
        ?.map((_, index) => (
          <li
            className={`page-item ${
              Math.floor(offset / limit) === index ? "active" : ""
            }`}
            onClick={() => setOffset(index * limit)}
            key={index}
          >
            <Link className="page-link" href="">
              {index + 1}
            </Link>
          </li>
        ))}
    </ul>
  );
}

export default Pagaination;
