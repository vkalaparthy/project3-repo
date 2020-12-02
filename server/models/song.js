const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const songSchema = new Schema({
  title: { type: String, required: true },
  artistname: { type: String, required: true },
  url: { type: String, required: true },
  image: {type: String, required: true },
  preview: { type: String }
});

const Song = mongoose.model("Song", songSchema);

module.exports = Song;
