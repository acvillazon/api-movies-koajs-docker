const koaRouter = require('koa-router');
const router = new koaRouter();
const movie = require('../controllers/movie.controller');
const {validateYear,validatePage,validateUptaeObject} = require('../middlewares/movie.middleware');

const setRoutes = (router) =>{
    router.get('/movies/:movie', validateYear ,movie.searchMovie);
    router.get('/movies', validatePage, movie.getAllMoviesDB);
    router.post('/movies', validateUptaeObject, movie.updateMovieDB);
};

module.exports = setRoutes;