import { useContext } from "react";
import { Link } from "react-router-dom";

import { TagContext } from "../../store";

function TagList({ tags, setFeedDisplay, setOffset }) {
  const { setTag } = useContext(TagContext);
  const noTag = tags?.length === 0 && <div>No tags are here... yet.</div>;

  const handleChangeTag = (tag) => {
    setOffset(0);
    setTag(tag);
    setFeedDisplay("tag-feed");
  };

  return (
    <div className="tag-list">
      {tags ? (
        tags.map((tag, index) => (
          <Link
            key={index}
            to=""
            className="tag-pill tag-default"
            onClick={() => handleChangeTag(tag)}
          >
            {tag}
          </Link>
        ))
      ) : (
        <div>Loading tags...</div>
      )}
      {noTag}
    </div>
  );
}

export default TagList;
