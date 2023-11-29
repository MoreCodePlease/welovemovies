const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

const addCritic = mapProperties({
    critic_id: "critic.critic_id",
    preferred_name: "critic.preferred_name",
    surname: "critic.surname",
    organization_name: "critic.organization_name",
    created_at: "critic.created_at",
    updated_at: "critic.updated_at",
})


function read(review_id) {
    return knex("reviews")
        .select("*")
        .join("critics", "reviews.critic_id", "critics.critic_id")
        .where("review.review_id", review_id)
        .first()
        .then(addCritic);
}   

function list(movie_id) {
    return knex("reviews")
    .select("*")
    .join("critics", "reviews.critic_id", "critics.critic_id")
    .where({"reviews.movie_id": movie_id})
    //.then(addCritic);
}


module.exports = {
    read,
    list
}