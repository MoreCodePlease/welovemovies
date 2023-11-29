const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

const addCritic = mapProperties({
    critic_id: "critic.critic_id",
    preferred_name: "critic.preferred_name",
    surname: "critic.surname",
    organization_name: "critic.organization_name",
    //created_at: "critic.created_at",
    //updated_at: "critic.updated_at",
})


function read(review_id) {
    //return knex.raw(`select * from reviews join critics on critics.critic_id = reviews.critic_id where reviews.review_id = ${review_id}`)
    
    return knex("reviews")
        .select("*")
        //.fullOuterJoin("reviews", "reviews.critic_id", "critics.critic_id")
        .where({"reviews.review_id": review_id})
        .first()
        //.then(addCritic);
        
}   

function list(movie_id) {
    return knex("reviews")
    .select("*")
    //.join("critics", "reviews.critic_id", "critics.critic_id")
    .where({"reviews.movie_id": movie_id})
    //.then(addCritic);
}

function readCritic(critic_id) {
    return knex("critics").where({critic_id: critic_id}).first()
}

function update(updatedReview) {
    return knex("reviews")
        .select("*")
        .where({ review_id : updatedReview.review_id})
        .update({...updatedReview, updated_at: knex.fn.now()},Object.keys(updatedReview))
        .then((updatedRecords) => updatedRecords[0]);
}


module.exports = {
    read,
    list,
    readCritic,
    update
}