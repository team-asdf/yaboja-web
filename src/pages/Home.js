import React, { Component } from "react";
import { Banner, ArticleList } from "../components";
import "./Home.scss";

class Home extends Component {
  render() {
    var date = new Date();
    date.setMinutes(date.getMinutes() > 30 ? 30 : 0);
    return (
      <div>
        <Banner />
        <div className="blank container">
          Last Update : {date.toLocaleString()}
        </div>
        <ArticleList />
      </div>
    );
  }
}

export default Home;
