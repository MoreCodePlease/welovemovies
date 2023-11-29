const reviewsService = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function reviewExists(req, res, next) {
    const review = await reviewsService.read(Number(req.params.reviewId))
    if(review) {
        res.locals.review = review;
        next();
    } else {
        next({ status: 404, message: `Review cannot be found.` });
    }
}

async function update(req, res) {
    const data = req.body;
    const updatedReview = {
        ...res.locals.review,
        ...req.body,
        review_id: res.locals.review.review_id,
      };
    const reviewData = await reviewsService.update(updatedReview);
    const criticData = await reviewsService.readCritic(updatedReview.critic_id);
    res.status(200).json({data: {...reviewData, critic: criticData}})
}

async function list( req, res) {
    res.json({ data: await reviewsService.list(req.params.movieId) });
}

module.exports = {
    update: [
        asyncErrorBoundary(reviewExists),
        asyncErrorBoundary(update)
    ],
    list: asyncErrorBoundary(list) 

}