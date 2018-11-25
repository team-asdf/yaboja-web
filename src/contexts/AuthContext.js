import React, { Component } from "react";
import { api } from "../consts/apis";
import qwest from "qwest";

const AuthContext = React.createContext();
const { Provider, Consumer: AuthConsumer } = AuthContext;

const STATUS = {
  VERIFY: 3,
  SUCCESS: 2,
  FAIL: 1,
  WAIT: 0
};

class AuthProvider extends Component {
  state = { initialized: false, verified: STATUS.WAIT, profile: undefined };

  actions = {
    updateKeywod: keyword => {
      qwest.post("http://angelbeats.tk:3000/api/v1/signup/gwons", {
        userid: "gwon",
        keyword: keyword
      });

      let profile = this.state.profile;
      profile["keyword"][0]["keyword"] = keyword;
      this.setState({ profile: profile });
    },
    select: () => {
      this.setState({ verified: STATUS.VERIFY });
    },
    login: username => {
      qwest
        .get("http://angelbeats.tk:3000/api/v1/contents/keyword/gwons")
        .then(response => JSON.parse(response["response"]))
        .then(response => {
          let profile = this.state.profile;
          profile["keyword"] = response;

          this.setState({ initialized: true });
        });
    },
    verify: username => {
      // WAIT -> {FAIL, SUCCESS}
      const url = api.IS_GITHUB_ID_CHECKER;

      // this.setState({});

      qwest
        .post(url, {
          userid: username,
          async: true
        })
        .then(response => JSON.parse(response["response"]))
        .then(response => {
          // qwest.post("http://angelbeats.tk:3000/api/v1/signup", {
          //   userid: username,
          //   extract_language: "",
          //   keyword: ""
          // });

          if (response["check"]) {
            this.setState({
              verified: STATUS.SUCCESS,
              profile: response
            });
          } else {
            this.setState({
              verified: STATUS.FAIL
            });
          }
        });
    },

    logout: () => {
      this.setState({ initialized: false, profile: undefined });
    }
  };

  render() {
    const { state, actions } = this;

    const value = { state, actions };
    return <Provider value={value}>{this.props.children}</Provider>;
  }
}

function useProvider(WrappedComponent) {
  return function UseProvider(props) {
    return (
      <AuthConsumer>
        {({ state, actions }) => (
          <WrappedComponent
            initialized={state.initialized}
            profile={state.profile}
            verified={state.verified}
            select={actions.select}
            login={actions.login}
            logout={actions.logout}
            updateKeywod={actions.updateKeywod}
          />
        )}
      </AuthConsumer>
    );
  };
}

export { AuthProvider, AuthConsumer, useProvider, STATUS };
