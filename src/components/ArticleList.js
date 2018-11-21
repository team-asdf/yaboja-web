import React, { Component } from "react";
import Article from "./Article";
import { AuthConsumer } from "../contexts/AuthContext";

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
  state = {
    inizialized: false,
    profile: undefined,
    articles: []
  };

  componentDidMount() {
    this.setState({
      initialized: this.props.initialized,
      index: 0,
      profile: this.props.profile,
      articles: []
    });

    this._getArticles();
    this.setState(({ index }) => ({ index: index + 1 }));
  }

  _getArticles = async () => {
    const articles = await this._callApi(this.state.index);
    this.setState({
      articles: [...this.state.articles, articles]
    });
  };

  _callApi = () => {
    return fetch("http://angelbeats.tk:3000/api/v1/get_contents/1")
      .then(response => response.json())
      .catch(err => console.log(err));
  };

  render() {
    return <div>article</div>;
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

// export default () => {
//   return (
//     <div>
//       {({ articles, update }) => (
//         <div key={String(guid())}>
//           <button
//             onClick={e => {
//               e.preventDefault();
//               update();
//             }}
//           >
//             update
//           </button>
//           {articles.map((article, idx) => {
//             const {
//               title,
//               content,
//               keyword: keywords,
//               source,
//               url,
//               createdAt
//             } = article;

//             return (
//               <Article
//                 key={String(guid())}
//                 value={{ title, content, keywords, source, url, createdAt }}
//               />
//             );
//           })}
//         </div>
//       )}
//     </div>
//   );
// };
