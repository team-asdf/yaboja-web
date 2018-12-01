export const api = {
  GET_ARTICLE: (page = 1, username = undefined, isArchive = false) => {
    if (!isArchive) {
      return (
        process.env.REACT_APP_API_HOST +
        "/contents/" +
        (username ? username + "/" : "") +
        String(page)
      );
    } else {
      return (
        process.env.REACT_APP_API_HOST +
        "/contents/archives/" +
        String(username)
      );
    }
  },
  IS_GITHUB_ID_CHECKER: process.env.REACT_APP_API_HOST + "/checker",
  LANGUAGES: process.env.REACT_APP_API_HOST + "/languages",
  ARCHIVE_UPDATE: (content, profile) => {
    return (
      process.env.REACT_APP_API_HOST +
      "/updater" +
      (content["archive"] ? "/" + profile["login"] : "") +
      ("/" + String(content["idx"]))
    );
  },
  GET_ARCHIVE_ARTICLE: username =>
    process.env.REACT_APP_API_HOST + "/contents/archives/" + String(username),
  SIGNUP: username => process.env.REACT_APP_API_HOST + "/signup/" + username,
  USER_KEYWORD: username =>
    process.env.REACT_APP_API_HOST + "/contents/keyword/" + username,
  OPENSOURCE: process.env.REACT_APP_API_HOST + "/opensources"
};
