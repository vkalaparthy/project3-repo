const router = require("express").Router();
const songsController = require("../../controllers/songsController");

router.route("/")
  // .get(songsController.findAll)
  .post(songsController.create);

module.exports = router;