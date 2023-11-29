const reviewsService = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function reviewExists(req, res, next) {
    const review = await reviewsService.read(req.params.reviewId)
    if(review) {
        res.locals.review = review;
        next();
    } else {
        next({ status: 404, message: `Review cannot be found.` });
    }
}

async function update(req, res) {
    const updatedReview = {
        ...response.locals.review,
        ...request.body.data,
        review_id: response.locals.review.review_id,
      };
    const data = await service.update(updatedReview);
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