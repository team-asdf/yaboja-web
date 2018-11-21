import React from "react";

import { useProvider } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

import { PATH } from "../consts/consts";

import "./Navigation.scss";

const NavigationBar = ({ initialized, profile, logout }) => (
  <header className="site-header" id="scroll-navbar">
    <div className="container">
      <div className="site-title">
        <i />
        <span>똑똑하게 야보자</span>
      </div>

      <nav className="site-nav">
        {initialized ? (
          <div>
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
            <img className="profile-image" src={profile["avatar_url"]} alt="" />
          </div>
        ) : (
          <a href={PATH.LOGIN}>로그인</a>
        )}
      </nav>
    </div>
    <div className="clearfix" />
  </header>
);

export default useProvider(NavigationBar);
