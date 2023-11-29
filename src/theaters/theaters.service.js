const knex = require("../db/connection");

function listTheaters() {
    return knex("theaters")
        .select("*")
        .join("movies_theaters","theaters.theater_id","movies_theaters.theater_id")
        .join("movies", "movies.movie_id","movies_theaters.movie_id")
}

module.exports = {
    listTheaters
}