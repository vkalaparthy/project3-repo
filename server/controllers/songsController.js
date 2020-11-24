const ObjectId = require("mongoose").Types.ObjectId;
const db = require("../models");

// Defining methods for the songsController
module.exports = {
  findAll: function(req, res) {
    console.log("In findAll SongsController");
    console.log(req.user._id);
    db.User.findOne({ _id: req.user._id }).populate('playlist')
      .then(userMatch => {
        // console.log(res.data.playlist);
        // return res.json(res.data.playlist);
        if(userMatch) {
          console.log(userMatch.playlist);
          return res.json(userMatch.playlist);
        }
      })
      .catch(err => {
        console.log("FAILED");
        return res.status(422).json(err)
      });
  },
  create: function(req, res) {
    console.log("response for playlist", req.body);
    db.Song
      .create({title: req.body.songname, artistname: req.body.artistname, url: req.body.song})
      .then(dbSong => {
        return db.User.findOneAndUpdate({ _id: req.user._id }, { $push: { playlist: dbSong._id } }, { new: true }).populate("playlist");
      })
      .then((dbUser) => {
        // If the User was updated successfully, send it back to the client
        res.json(dbUser);
      })
      .catch(err => res.status(422).json(err));
  }
};