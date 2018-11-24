import React, { Component } from "react";
import { AuthConsumer } from "../contexts/AuthContext";
import { Redirect } from "react-router-dom";
import "./Login.scss";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialized: false,
      username: "",
      log: ""
    };

    this.handleOnLogin = this.handleOnLogin.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  componentDidMount() {
    this.setState({ initialized: this.props.initialized });
  }

  handleOnChange(e) {
    e.preventDefault();
    this.setState({ username: e.target.value });
  }

  handleOnLogin(e) {
    e.preventDefault();
    this.props.login(this.state.username);
    this.setState({ initialized: true });
  }

  render() {
    const { initialized } = this.state;

    let body = "";

    body = initialized ? (
      <Redirect to="/setting" />
    ) : (
      <section id="login">
        <div className="col login-wrapper">
          <form onSubmit={this.handleOnLogin}>
            <div className="row">
              <div className="login-title">
                <h3>
                  기술문서, <b>똑똑하게</b> 구독하세요!
                  <br />
                  우리 다같이 <b>야보자!</b>
                </h3>
              </div>
              <div className="input-login-group">
                <div className="input-group">
                  <label>아이디</label>
                  <input
                    id="login-username"
                    onChange={this.handleOnChange}
                    type="text"
                    placeholder="깃허브 닉네임"
                    required=""
                    className=""
                  />
                </div>
              </div>
            </div>
            <div className="row submit">
              <button className="btn btn-key" type="submit">
                <span>시작하기!</span>
              </button>
            </div>
          </form>
        </div>
        <div className="image-view" />
      </section>
    );

    return body;
  }
}

const LoginContainer = () => (
  <AuthConsumer>
    {({ state, actions }) => (
      <Login initialized={state.initialized} login={actions.login} />
    )}
  </AuthConsumer>
);

export default LoginContainer;

// <div className="login-form">
//             <form onSubmit={this.handleOnLogin}>
//               <input
//                 type="text"
//                 value={username}
//                 onChange={this.handleOnChange}
//               />
//               <button type="submit" />
//             </form>
//             <h1>{username}</h1>
//             <h1>{initialized ? "V" : "N"}</h1>
