import React, { Component } from "react";
import qwest from "qwest";
import { api } from "../consts/apis";

class About extends Component {
  state = {
    opensource: []
  };

  componentDidMount() {
    qwest
      .get(api.OPENSOURCE)
      .then(response => JSON.parse(response["response"]))
      .then(response => {
        this.setState({ opensource: response });
      });
  }

  render() {
    const { opensource } = this.state;
    return (
      <div>
        <div className="container">
          <header className="archive-header ">
            <h1>Opensource</h1>
          </header>
          <div>
            <ul>
              {opensource.map(stack => (
                <li key={String(stack["id"])}>
                  <a href={stack["url"]}>
                    <h2>{stack["repo"]}</h2>
                    {stack["url"]}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <h1>🚀😎</h1>
        </div>
      </div>
    );
  }
}

export default About;
