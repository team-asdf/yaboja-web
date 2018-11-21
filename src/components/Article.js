import React from "react";

export default ({ value }) => {
  return (
    <div>
      <span className="post-meta">
        {value["createdAt"]} {value["source"]}
      </span>
      <a href={value["url"]} target="_blank">
        <h3>{value["title"]}</h3>
        <p>{value["content"]}</p>
      </a>

      <hr />
    </div>
  );
};
