const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

function list() {
    return knex("movies")
        .select("movie_id")
        .select("title")
        .select("runtime_in_minutes")
        .select("rating")
        .select("description")
        .select("image_url")   
}

function listShowing() {
  return knex("movies")
      .distinct("movies.movie_id")
      .select("movies.title")
      .select("movies.runtime_in_minutes")
      .select("movies.rating")
      .select("movies.description")
      .select("movies.image_url")
      .join("movies_theaters", "movies.movie_id", "movies_theaters.movie_id")
      .where("movies_theaters.is_showing", true);
}

function read(movie_id) {
  return knex("movies").select("*")
      .where("movie_id", movie_id).first();       
}

function readReviews(movie_id) {
  return knex("reviews").select("*")
      .where("movie_id", movie_id);   
}

function readCritics() {
  return knex("critics")      
}

function listPlayingTheaters(movie_id) {
  return knex("theaters")
    .select("theaters.*", "movies_theaters.*")
    .join("movies_theaters", "theaters.theater_id", "movies_theaters.theater_id")
    .where("movies_theaters.movie_id", movie_id);
}

  module.exports = {
    list,
    listShowing,
    read,
    readCritics,
    listPlayingTheaters,
    readReviews
  }