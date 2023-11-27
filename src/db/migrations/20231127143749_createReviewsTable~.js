
exports.up = function(knex) {
    return knex.schema.createTable("reviews", (table) => {
        table.increments("review_id").primary;
        table.string("content");
        table.integer("score");
        table.foreign("critic_id").references('critics.critic_id');
        table.foreign("movie_id").references('movies.movie_id');
        table.timestamps(true, true);
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable("reviews");
};
