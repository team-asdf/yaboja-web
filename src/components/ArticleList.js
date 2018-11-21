import React, { Component } from "react";
import InfiniteScroll from "react-infinite-scroller";
import qwest from "qwest";
import Article from "./Article";
import { AuthConsumer } from "../contexts/AuthContext";

import "./ArticleList.scss";

function guid() {
  function s4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }
  return (
    s4() +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    s4() +
    s4()
  );
}

class ArticleList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inizialized: false,
      profile: undefined,
      articles: [],
      hasMoreItems: true,
      nextHref: null
    };
  }

  componentDidMount() {
    this.setState({
      initialized: this.props.initialized,
      profile: this.props.profile
    });
  }

  loadArticles(page) {
    var self = this;

    var url = this.state.nextHref
      ? this.state.nextHref
      : process.env.REACT_APP_API_HOST + "/get_contents/" + String(page);

    qwest
      .get(
        url,
        {
          linked_partitioning: 1,
          page_size: 10
        },
        { cache: true }
      )
      .then(response => JSON.parse(response["response"]))
      .then(response => {
        var articles = self.state.articles;

        response.map(resp => {
          resp["idx"] = guid();
          articles.push(resp);
        });

        self.setState({
          articles,
          nextHref:
            process.env.REACT_APP_API_HOST + "/get_contents/" + String(page)
        });
      });
  }

  render() {
    const loader = (
      <div key={guid()} className="loading-bar">
        Loading...
      </div>
    );

    var items = [];
    this.state.articles.map((article, i) =>
      items.push(<Article key={String(guid())} article={article} />)
    );

    return (
      <InfiniteScroll
        pageStart={0}
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
    );
  }
}

const ArticleListContainer = () => (
  <AuthConsumer>
    {({ state }) => (
      <ArticleList initialized={state.initialized} profile={state.profile} />
    )}
  </AuthConsumer>
);

export default ArticleListContainer;
