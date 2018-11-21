import React, { Component } from "react";
import { Banner, ArticleList } from "../components";
class Home extends Component {
  render() {
    return (
      <div>
        <Banner />
        <ArticleList />
      </div>
    );
  }
}

export default Home;
