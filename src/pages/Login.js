import React, { Component } from "react";
import { AuthConsumer, STATUS } from "../contexts/AuthContext";
import { Redirect } from "react-router-dom";
import { Profile } from "../components";
import "./Login.scss";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      preloader: false,
      time: 0,
      intervalHandle: undefined
    };

    this.handleOnVerify = this.handleOnVerify.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnLogin = this.handleOnLogin.bind(this);
    this.handleOnSelect = this.handleOnSelect.bind(this);
    this.countUp = this.countUp.bind(this);
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalHandle);
  }

  handleOnChange(e) {
    e.preventDefault();
    this.setState({ username: e.target.value });
  }

  handleOnVerify(e) {
    e.preventDefault();
    this.props.verify(this.state.username);
  }

  handleOnLogin(e) {
    e.preventDefault();
    this.props.login(this.state.username);
    this.setState({ preloader: true });
    this.countUp();
  }

  handleOnSelect(e) {
    e.preventDefault();
    this.props.select();
  }

  countUp() {
    this.setState(({ intervalHandle }) => ({
      intervalHandle: setInterval(() => {
        this.setState(({ time }) => ({ time: time + 1 }));
      }, 10)
    }));
  }

  render() {
    const { initialized, verified } = this.props;
    const { preloader, time } = this.state;

    let body = "";
    let arg =
      verified === STATUS.WAIT || verified === STATUS.FAIL
        ? {
            onSubmit: this.handleOnVerify,
            profile: verified === STATUS.FAIL ? "틀림!" : "",
            text: "입력",
            btn: "btn-sub"
          }
        : verified === STATUS.SUCCESS
          ? {
              onSubmit: this.handleOnVerify,
              profile: (
                <Profile
                  data={this.props.profile}
                  onClick={this.handleOnSelect}
                />
              ),
              text: "선택해주세요",
              btn: "btn-sub"
            }
          : {
              onSubmit: this.handleOnLogin,
              profile: (
                <Profile
                  data={this.props.profile}
                  onClick={this.handleOnSelect}
                />
              ),
              text: "시작하기",
              btn: "btn-key"
            };

    body = initialized ? (
      <Redirect to="/setting" />
    ) : (
      <section id="login">
        <div className="col login-wrapper">
          <form onSubmit={arg.onSubmit}>
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
                <div className="input-group">{arg.profile}</div>
              </div>
            </div>
            <div className="row submit">
              <button className={"btn " + arg.btn} type="submit">
                <span>{arg.text}</span>
              </button>
            </div>
          </form>
        </div>
        <div className="image-view" />
        {preloader ? (
          <div className="preloader">
            <div className="spinner" />
            <h1>분석중입니다.</h1>
            <h2>{time / 100}초</h2>
          </div>
        ) : (
          ""
        )}
      </section>
    );

    return body;
  }
}

const LoginContainer = () => (
  <AuthConsumer>
    {({ state, actions }) => (
      <Login
        initialized={state.initialized}
        verified={state.verified}
        profile={state.profile}
        login={actions.login}
        verify={actions.verify}
        select={actions.select}
      />
    )}
  </AuthConsumer>
);

export default LoginContainer;
