function SideBar() {
  return (
    <div className="sidebar">
      <p>Popular Tags</p>
      <div className="tag-list">
        {Object.values(tagList).map((tag, index) => (
          <a href="" className="tag-pill tag-default" key={index}>
            {tag}
          </a>
        ))}
      </div>
    </div>
  );
}

export default SideBar;
