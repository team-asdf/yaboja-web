import React, { Component } from "react";
import InfiniteScroll from "react-infinite-scroller";
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
    var url = this.state.nextHref ? this.state.nextHref : api.getArticle(page);

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
        var articles = this.state.articles;

        response.map(resp => {
          resp["idx"] = v1();
          articles.push(resp);
          return resp;
        });

        if (response.length === 0) {
          this.setState({ hasMoreItems: false });
        } else {
          this.setState({
            articles,
            nextHref: api.getArticle(page)
          });
        }
      });
  }

  render() {
    const loader = (
      <div key={v1()} className="loading-bar">
        Loading...
      </div>
    );

    var items = [];
    this.state.articles.map(article =>
      items.push(<Article key={String(v1())} article={article} />)
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
