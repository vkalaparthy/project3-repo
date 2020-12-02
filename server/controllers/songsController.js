const ObjectId = require("mongoose").Types.ObjectId;
const db = require("../models");

// Defining methods for the songsController
module.exports = {
  findAll: function(req, res) {
    db.User.findOne({ _id: req.user._id }).populate('playlist')
      .then(userMatch => {
        if(userMatch) {
          return res.json(userMatch.playlist);
        }
      })
      .catch(err => {
        return res.status(422).json(err)
      });
  },
  create: function(req, res) {
    db.Song
      .create({title: req.body.songname, artistname: req.body.artistname, url: req.body.song, image: req.body.image, preview: req.body.preview})
      .then(dbSong => {
        return db.User.findOneAndUpdate({ _id: req.user._id }, { $push: { playlist: dbSong._id } }, { new: true }).populate("playlist");
      })
      .then((dbUser) => {
        // If the User was updated successfully, send it back to the client
        res.json(dbUser);
      })
      .catch(err => res.status(422).json(err));
  },
  delete: function(req, res) {
    db.User.findOneAndUpdate({ _id: req.user._id }, { $pull: { playlist: new ObjectId(req.params.id) } }, { new: true })
      .then(() => {
        db.Song
          .findOneAndDelete({ _id: req.params.id })
          .then(dbSong => res.json(dbSong))
          .catch(err => res.status(422).json(err));
      });
  }
};