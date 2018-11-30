import React, { Component } from "react";

import { AuthConsumer } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

import { PATH } from "../consts/consts";

import "./Navigation.scss";

import classnames from "classnames";

class NavigationBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: false
    };
    this.handleToggle = this.handleToggle.bind(this);
  }

  handleToggle() {
    this.setState(({ toggle }) => ({ toggle: !toggle }));
  }

  render() {
    const { toggle } = this.state;
    const { initialized, profile, logout } = this.props;

    return (
      <header className="site-header" id="scroll-navbar">
        <div className="container">
          <div className="site-title">
            <Link to={PATH.HOME}>
              <i />
              <span>똑똑하게 야보자</span>
            </Link>
            <div
              className={classnames({
                icon: true,
                open: toggle
              })}
              onClick={this.handleToggle}
            >
              <div className="ic-menu menu-top" />
              <div className="ic-menu menu-bottom" />
            </div>
          </div>

          <nav
            className={classnames({
              "site-nav": true,
              open: toggle
            })}
          >
            {initialized ? (
              <div onClick={this.handleToggle}>
                <Link to={PATH.ARCHIVE}>또보자</Link>
                <Link to={PATH.SETTING}>설정</Link>
                <a
                  href={PATH.HOME}
                  onClick={e => {
                    e.preventDefault();
                    logout();
                  }}
                >
                  로그아웃
                </a>
                <img
                  className="profile-image"
                  src={profile["avatar_url"]}
                  alt=""
                />
              </div>
            ) : (
              <a href={PATH.LOGIN}>로그인</a>
            )}
          </nav>
        </div>
        <div className="clearfix" />
      </header>
    );
  }
}

const NavigationBarContainer = () => (
  <AuthConsumer>
    {({ state, actions }) => {
      // console.log(isArchive);
      return (
        <NavigationBar
          initialized={state.initialized}
          profile={state.profile}
          logout={actions.logout}
        />
      );
    }}
  </AuthConsumer>
);

export default NavigationBarContainer;
