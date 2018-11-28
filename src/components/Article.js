import React from "react";

import "./Article.scss";

export default ({ initialized, article, keyword, onClick, archiveClick }) => {
  return (
    <div className="list-module">
      {initialized ? (
        <button
          onClick={() => archiveClick(article["idx"])}
          className={
            article["archive"]
              ? "btn btn-key archive"
              : "btn btn-default archive"
          }
        >
          <span>또보자</span>
        </button>
      ) : (
        ""
      )}
      <div className="desc">
        <ul className="post-tag">
          <li>#{article["source"]}</li>
          <li>{article["createdAt"]}</li>
        </ul>
      </div>
      <a
        onClick={onClick}
        href={article["url"]}
        target="_blank"
        rel="noopener noreferrer"
      >
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
            <li key={String(article["uuid"] + k)} className={highlight}>
              {"# " + k.replace(" ", "_")}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
