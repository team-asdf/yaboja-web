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
    select: () => {
      console.log(1);
      // SUCCESS -> VERIFY
      this.setState({ verified: STATUS.VERIFY });
    },
    login: () => {
      // LOGIN
      this.setState({ initialized: true });
    },
    verify: username => {
      // WAIT -> {FAIL, SUCCESS}
      const url = api.IS_GITHUB_ID_CHECKER;

      this.setState({ verified: STATUS.SUCCESS });

      this.setState({
        profile: {
          login: "dexterastin",
          id: 13868235,
          node_id: "MDQ6VXNlcjEzODY4MjM1",
          avatar_url: "https://avatars2.githubusercontent.com/u/13868235?v=4",
          gravatar_id: "",
          url: "https://api.github.com/users/dexterastin",
          html_url: "https://github.com/dexterastin",
          followers_url: "https://api.github.com/users/dexterastin/followers",
          following_url:
            "https://api.github.com/users/dexterastin/following{/other_user}",
          gists_url: "https://api.github.com/users/dexterastin/gists{/gist_id}",
          starred_url:
            "https://api.github.com/users/dexterastin/starred{/owner}{/repo}",
          subscriptions_url:
            "https://api.github.com/users/dexterastin/subscriptions",
          organizations_url: "https://api.github.com/users/dexterastin/orgs",
          repos_url: "https://api.github.com/users/dexterastin/repos",
          events_url:
            "https://api.github.com/users/dexterastin/events{/privacy}",
          received_events_url:
            "https://api.github.com/users/dexterastin/received_events",
          type: "User",
          site_admin: false,
          name: "Gihyeon Yang",
          company: "@SullivanEducation",
          blog:
            "https://www.notion.so/dexterastin/R-sum-c7db919b7a774b49be8d9e8340849663",
          location: "Korea",
          email: null,
          hireable: true,
          bio:
            "Undergraduate at Kookmin Univ CS.  Studying at the Embedded Robotics Society KOBOT.",
          public_repos: 13,
          public_gists: 3,
          followers: 14,
          following: 10,
          created_at: "2015-08-19T10:59:26Z",
          updated_at: "2018-11-23T10:19:42Z"
        }
      });

      // qwest
      //   .post(url, {
      //     userid: username,
      //     async: true
      //   })
      //   .then(response => JSON.parse(response["response"]))
      //   .then(response => {
      //     console.log(response);
      //     if (response["check"]) {
      //       this.setState({
      //         verified: 1,
      //         profile: response
      //       });
      //     } else {
      //       this.setState({
      //         verified: 2
      //       });
      //     }
      //   });
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
          />
        )}
      </AuthConsumer>
    );
  };
}

export { AuthProvider, AuthConsumer, useProvider, STATUS };
