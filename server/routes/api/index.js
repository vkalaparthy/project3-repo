const router = require("express").Router();
const bookRoutes = require("./books");
const songRoutes = require("./songs");

// Book routes
router.use("/books", bookRoutes);
router.use("/songs", songRoutes);

module.exports = router;
