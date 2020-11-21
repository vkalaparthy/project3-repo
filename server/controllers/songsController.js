const ObjectId = require("mongoose").Types.ObjectId;
const db = require("../models");

// Defining methods for the songsController
module.exports = {
  // findAll: function(req, res) {
  //   if (req.user) {
  //     db.User
  //       .find({ _id: req.user._id })
  //       .populate({ path: "playlist", options: { sort: { 'date': -1 } } })
  //       .then(users => {
  //         res.json({ playlist: users[0].playlist });
  //       })
  //       .catch(err => res.status(422).json(err));
  //   } else {
  //     return res.json({ books: null });
  //   }
  // },
  create: function(req, res) {
    console.log("response for playlist", req.body);
    db.Song
      .create({title: req.body.songname, artistname: req.body.artistname, url: req.body.song})
      .then(dbSong => {
        return db.User.findOneAndUpdate({ _id: req.user._id }, { $push: { playlist: dbSong._id } }, { new: true });
      })
      .then((dbUser) => {
        // If the User was updated successfully, send it back to the client
        res.json(dbUser);
      })
      .catch(err => res.status(422).json(err));
  }
};