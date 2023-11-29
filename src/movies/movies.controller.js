const moviesService = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res) {
    const {is_showing} = req.query
    const data = (is_showing)?await moviesService.listShowing():await moviesService.list();
    res.json( {data: data} );
}

async function movieExists(req, res, next) {
    const movie = await moviesService.read(req.params.movieId);
    if (movie) {
        res.locals.movie = movie;
        return next();
    } else {
        next({ status: 404, message: `Movie cannot be found.` });
    }
}

function read(req, res) {
    const movie = res.locals.movie;
  res.json({ data: movie });
}

async function listPlayingTheaters( req, res) {
    res.json({ data: await moviesService.listPlayingTheaters(req.params.movieId) });
}

async function listMovieReviews( req, res) {
    res.json({ data: await moviesService.listMovieReviews(req.params.movieId) });
}

module.exports = {
    list: asyncErrorBoundary(list),
    read:[asyncErrorBoundary(movieExists),read],
    listPlayingTheaters: asyncErrorBoundary(listPlayingTheaters),
    listMovieReviews: asyncErrorBoundary(listMovieReviews),
    movieExists: asyncErrorBoundary(movieExists)
}
