const fetch = require("node-fetch");
const movieService = require("../services/movie.service");
const apiMovie = "https://www.omdbapi.com/?apikey=a9c89422";

/**
 * @swagger
 * resourcePath: /apiJs
 * description: All about API Movie
 */

/**
 * @swagger
 * path: /movies/:movie
 * operations:
 *   -  httpMethod: GET
 *      summary: search movies or series giving a string
 *      notes: return the movie or serie that match the string
 *      nickname: searchMovie
 *      consumes: 
 *        - text/html
 *      parameters:
 *        - name: movie
 *          description: The movie to search
 *          paramType: param
 *          required: true
 *          dataType: string
 *      headers: 
*        - name: year
*          description: The yaer to the movie
*          paramType: param
*          required: false
*          dataType: string
 */
const searchMovie = async (ctx) => {
  try {
    const movie = ctx.params.movie || "";
    const year = ctx.headers.year || null;
    let url = `${apiMovie}&plot=full&t=${movie}`;
    year ? (url += `&y=${year}`) : null;

    const requestApi = await fetch(url);
    const response = await requestApi.json();
    if (response.Response == "False") {
      return ctx.body = responseJson(404, null, error, "Movie was not found in API");
    }

    let responseDB = await movieService.createMovie(response);
    if (responseDB.error) {
      return ctx.body = responseJson(500, null, ...responseDB);
    }
    ctx.body = responseJson(200, responseDB);
  } catch (error) {
    ctx.body = responseJson(200, null, error);
  }
};

const getAllMoviesDB = async (ctx) => {
  const page = ctx.headers.page || 0;
  let responseDB = await movieService.getMovies(page);

  if (responseDB.error) {
    return ctx.body = responseJson(500, null, ...responseDB);
  }

  ctx.body = responseJson(200, responseDB);
};

const updateMovieDB = async (ctx) => {
  let dataUpdated = ctx.request.body;
  let responseDB = await movieService.updateMovies(dataUpdated);

  if (responseDB.error) {
    return ctx.body = responseJson(500, null, ...responseDB);
  }

  ctx.body = responseJson(200, responseDB);
};

const responseJson = (status, load, error = null, message = null) => {
    return {
      status,
      message,
      load,
      error
    };
};

module.exports = {
  searchMovie,
  getAllMoviesDB,
  updateMovieDB,
};
