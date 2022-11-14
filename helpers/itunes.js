const axios = require("axios");
const dataUrl = "https://itunes.apple.com";

module.exports = {
  lookup(id) {
    return axios.get(`${dataUrl}/lookup?id=${id}`);
  },
  search(value) {
    return axios.get(
      `${dataUrl}/search?term=${value}`
    );
  },
  playlist(value) {
    return axios.get(
      `${dataUrl}/search?term=${value}&country=id&entity=musicTrack&attribute=albumTerm&limit=10`
    );
  },
};
