import React, { Component } from "react";
import { Banner, ArticleList } from "../components";
import "./Home.scss";

class Home extends Component {
  render() {
    return (
      <div>
        <Banner />
        <div className="blank">blank</div>
        <ArticleList />
      </div>
    );
  }
}

export default Home;
