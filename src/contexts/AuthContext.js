import React from "react";

const AuthContext = React.createContext();

const { Provider, Consumer: AuthConsumer } = AuthContext;

class AuthProvider extends React.Component {
  state = { initialized: false, profile: undefined };

  actions = {
    login: () => {
      setTimeout(
        () =>
          this.setState({
            initialized: true,
            profile: {
              login: "dexterastin",
              id: 13868235,
              node_id: "MDQ6VXNlcjEzODY4MjM1",
              avatar_url:
                "https://avatars2.githubusercontent.com/u/13868235?v=4",
              gravatar_id: "",
              url: "https://api.github.com/users/dexterastin",
              html_url: "https://github.com/dexterastin",
              followers_url:
                "https://api.github.com/users/dexterastin/followers",
              following_url:
                "https://api.github.com/users/dexterastin/following{/other_user}",
              gists_url:
                "https://api.github.com/users/dexterastin/gists{/gist_id}",
              starred_url:
                "https://api.github.com/users/dexterastin/starred{/owner}{/repo}",
              subscriptions_url:
                "https://api.github.com/users/dexterastin/subscriptions",
              organizations_url:
                "https://api.github.com/users/dexterastin/orgs",
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
              updated_at: "2018-11-20T12:18:02Z"
            }
          }),
        1
      );
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
            login={actions.login}
            logout={actions.logout}
          />
        )}
      </AuthConsumer>
    );
  };
}

export { AuthProvider, AuthConsumer, useProvider };
