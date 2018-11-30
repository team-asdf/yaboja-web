import React, { Component } from "react";
import { ArticleList } from "../components";

import "./Archive.scss";

class Archive extends Component {
  render() {
    return (
      <div>
        <div className="container">
          <header className="archive-header ">
            <h1>또보자! Archive</h1>
            <blockquote>어제 읽은 글을 오늘 까먹는 마법 같은 곳</blockquote>
          </header>
        </div>
        <ArticleList isArchive={true} />
      </div>
    );
  }
}

export default Archive;
