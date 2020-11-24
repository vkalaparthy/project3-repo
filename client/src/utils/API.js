import axios from "axios";

export default {
  addSong: function (songData) {
    return axios.post("/api/songs", songData)
  },

  getSongs: function() {
    return axios.get("/api/songs")
  }
};
