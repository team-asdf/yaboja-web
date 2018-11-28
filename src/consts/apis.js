export const api = {
  getArticle: (page = 1, username = undefined, isArchive = false) => {
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
  LANGUAGES: process.env.REACT_APP_API_HOST + "/languages"
};
