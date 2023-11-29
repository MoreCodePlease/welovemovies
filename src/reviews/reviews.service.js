const knex = require("../db/connection");

function read(review_id) {
    return knex("reviews")
        .select("*")
        .where({"review_id": review_id})
        .first()
}   

function list(movie_id) {
    return knex("reviews")
    .select("*")
    .where({"reviews.movie_id": movie_id})
}

function readCritic(critic_id) {
    return knex("critics").where({critic_id: critic_id}).first()
}

function update(updatedReview) {
    return knex("reviews")
        .select("*")
        .where({ review_id : updatedReview.review_id})
        .update({...updatedReview, updated_at: knex.fn.now()})
        .then((response) => response[0]);
}

function destroy(review_id) {
    return knex("reviews").where({review_id: review_id}).del();
}

module.exports = {
    read,
    list,
    readCritic,
    update,
    destroy
}