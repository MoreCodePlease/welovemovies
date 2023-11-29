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
    const {data} = req.body;
    const updatedReview = {
        ...res.locals.review,
        ...data,
        review_id: res.locals.review.review_id,
        critic_id:res.locals.review.critic_id,
      };
    await reviewsService.update(updatedReview);
    const reviewData = await reviewsService.read(res.locals.review.review_id);
    const criticData = await reviewsService.readCritic(updatedReview.critic_id);
    res.status(200).json({data: {...reviewData, critic: criticData}});
}

async function list( req, res) {
    res.json({ data: await reviewsService.list(req.params.movieId) });
}

async function destroy(req, res) {
    await reviewsService.destroy(res.locals.review.review_id);
    res.sendStatus(204);
}

module.exports = {
    update: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(update)],
    list: [asyncErrorBoundary(list)],
    delete: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)]


}