import React, { Component } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import qwest from "qwest";
import { v1 } from "uuid";
import Article from "./Article";
import "./ArticleList.scss";

import { AuthConsumer } from "../contexts/AuthContext";
import { api } from "../consts/apis";

class ArticleList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      hasMoreItems: true,
      nextHref: null
    };

    this.clickArticle = this.clickArticle.bind(this);
    this.archiveClick = this.archiveClick.bind(this);
  }

  clickArticle(e) {
    // console.log(e);
    // TODO: count view
  }

  archiveClick(idx) {
    // TODO: update archive
    var temp = this.state.articles;
    var message = "잘못된 요청입니다.";

    temp = temp.map(a => {
      if (a["idx"] === idx) {
        this.props.save(a);
        message = !a["archive"] ? "🚀 다음에 또보자!" : "삭제 완료";
        a["archive"] = !a["archive"];

        var toastObj = a["archive"] ? toast.success : toast.error;

        toastObj(message, {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true
        });
      }
      return a;
    });

    this.setState({ archive: temp });
  }

  loadArticles(page) {
    const { initialized, profile, archive, isArchive } = this.props;
    const { nextHref } = this.state;

    var url = !!nextHref
      ? nextHref
      : api.getArticle(
          page - 1,
          initialized ? profile["login"] : undefined,
          isArchive
        );

    qwest
      .get(url)
      .then(response => JSON.parse(response["response"]))
      .then(response => {
        var articles = this.state.articles;

        response.map((resp, index) => {
          resp["uuid"] = v1();
          resp["archive"] =
            archive.findIndex(a => {
              return a["idx"] === resp["idx"];
            }) !== -1;
          articles.push(resp);
          return resp;
        });

        if (response.length === 0 || isArchive) {
          this.setState({ hasMoreItems: false });
        } else {
          this.setState({
            articles,
            nextHref: api.getArticle(
              page,
              initialized ? profile["login"] : undefined,
              isArchive
            )
          });
        }
      });
  }

  render() {
    const { initialized, profile } = this.props;

    const loader = (
      <div key={v1()} className="loading-bar">
        글 불러오는 중...
      </div>
    );

    var items = [];
    this.state.articles.map(article =>
      items.push(
        <Article
          key={String(v1())}
          initialized={initialized}
          onClick={this.clickArticle}
          archiveClick={this.archiveClick}
          article={article}
          keyword={initialized ? profile["keyword"][0]["keyword"] : ""}
        />
      )
    );

    return (
      <div>
        <InfiniteScroll
          pageStart={1}
          loadMore={this.loadArticles.bind(this)}
          hasMore={this.state.hasMoreItems}
          loader={loader}
        >
          <div className="site-wrapper" role="main">
            <div className="container">
              <div className="post-list">{items}</div>
            </div>
          </div>
        </InfiniteScroll>
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnVisibilityChange
          draggable={false}
          pauseOnHover={false}
        />
      </div>
    );
  }
}

const ArticleListContainer = ({ isArchive = false }) => (
  <AuthConsumer>
    {({ state, actions }) => {
      console.log(isArchive);
      return (
        <ArticleList
          initialized={state.initialized}
          archive={state.archive}
          profile={state.profile}
          isArchive={isArchive}
          save={actions.save}
        />
      );
    }}
  </AuthConsumer>
);

export default ArticleListContainer;
