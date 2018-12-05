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
  state = {
    initialized: false,
    verified: STATUS.WAIT,
    profile: undefined,
    archive: []
  };

  actions = {
    save: content => {
      const { profile } = this.state;

      const url = api.ARCHIVE_UPDATE(content, profile);

      qwest
        .post(url, {
          idx: content["idx"],
          userid: profile["login"]
        })
        .then(response => JSON.parse(response["response"]))
        .then(response => {
          if (response["check"]) {
            if (!content["archive"]) {
              // 저장인 상태
              this.setState(({ archive }) => ({
                archive: archive.filter(a => {
                  return a["idx"] !== content["idx"];
                })
              }));
            } else {
              this.setState(({ archive }) => ({
                archive: [...archive, content]
              }));
              // 삭제해야하는 상태
            }
            // console.log("archive: ", this.state.archive);
          }
        });
    },
    updateKeywod: keyword => {
      const username = this.state.profile["login"];
      qwest.post(api.SIGNUP(username), {
        userid: username,
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
        .post(api.ANALYSIS, {
          userid: username
        })
        .then(response => JSON.parse(response["response"]))
        .then(response => {
          if (response["check"]) {
            qwest
              .get(api.USER_KEYWORD(username))
              .then(response => JSON.parse(response["response"]))
              .then(response => {
                let profile = this.state.profile;

                if (response[0]["keyword"] === "") {
                  response[0]["keyword"] = response[0]["extract_language"];
                  qwest.post(api.SIGNUP(username), {
                    userid: username,
                    keyword: response[0]["keyword"]
                  });
                }

                profile["keyword"] = response;
                this.setState({ initialized: true, profile: profile });
              });
          }
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
          qwest
            .get(api.GET_ARCHIVE_ARTICLE(username))
            .then(response => JSON.parse(response["response"]))
            .then(response => {
              this.setState({ archive: response });
              // console.log(this.state.archive);
            });

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
            archive={state.archive}
            select={actions.select}
            save={actions.save}
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
