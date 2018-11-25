import React from "react";

import "./Article.scss";

export default ({ article, keyword, onClick }) => {
  return (
    <div className="list-module" onClick={onClick}>
      <div className="desc">
        <p className="pf">
          <span className="ic-left">
            #{article["source"]} / {article["createdAt"]}
          </span>
        </p>
      </div>
      <a href={article["url"]} target="_blank" rel="noopener noreferrer">
        <h2 className="post-link">{article["title"]}</h2>
        <p className="post-description">{article["content"]}</p>
      </a>
      <ul className="post-tag">
        {article["keyword"].split(",").map(k => {
          const highlight =
            keyword
              .split(",")
              .map(k => k.toLowerCase())
              .indexOf(k.toLowerCase()) !== -1
              ? "tag-hightlight"
              : "";
          return (
            <li key={String(article["idx"] + k)} className={highlight}>
              {"# " + k.replace(" ", "_")}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
