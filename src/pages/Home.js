import React, { Component } from "react";
import { Banner, ArticleList } from "../components";
class Home extends Component {
  render() {
    return (
      <div>
        <h1>home</h1>
        <Banner />
        <ArticleList />
      </div>
    );
  }
}

export default Home;
