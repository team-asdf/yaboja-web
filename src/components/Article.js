import React from "react";

import "./Article.scss";

export default ({ article }) => {
  console.log(article);
  return (
    <div className="list-module">
      <span className="post-meta">
        {article["createdAt"]}, {article["source"]}
      </span>
      <a href={article["url"]}>
        <h2 className="post-link">{article["title"]}</h2>
        <p className="post-description">{article["content"]}</p>
      </a>
      <ul className="post-tag">
        {article["keyword"].split(",").map(k => (
          <li key={String(article["idx"] + k)}>{k}</li>
        ))}
      </ul>
    </div>
  );
};
