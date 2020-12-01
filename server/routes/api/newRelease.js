const router = require("express").Router();
const newReleaseController = require("../../controllers/newReleaseController");

router.route("/")
  .get(newReleaseController.findAll)
  .post(newReleaseController.create);

router
  .route("/:id")
  .delete(newReleaseController.delete);

module.exports = router;