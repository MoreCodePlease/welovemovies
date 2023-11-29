const router = require("express").Router();
const controller = require("./movies.controller");
const reviewsRouter = require("../reviews/reviews.router");
const methodNotAllowed = require("../errors/methodNotAllowed");



router.use("/:movieId/reviews", controller.movieExists, reviewsRouter);
router.route("/:movieId([0-9]+)/reviews").get(controller.listMovieReviews).all(methodNotAllowed);
router.route("/:movieId([0-9]+)/theaters").get(controller.listPlayingTheaters).all(methodNotAllowed);
router.route("/:movieId([0-9]+)").get(controller.read).all(methodNotAllowed);
router.route("/").get(controller.list).all(methodNotAllowed);
module.exports = router;