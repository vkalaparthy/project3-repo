const router = require("express").Router();
const songRoutes = require("./songs");

router.use("/songs", songRoutes);

module.exports = router;
