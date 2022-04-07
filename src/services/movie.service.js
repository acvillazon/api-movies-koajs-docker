const Movie = require("../models/movie.model");

const createMovie = async ({ Title = "NULL", Year = 0, Released = "NULL", Genre = "NULL", Director = "NULL", Actors = "NULL", Ratings = "NULL", Plot = "NULL" }) => {
  try {
    let movie = new Movie({ Title, Year, Released, Genre, Director, Actors, Ratings, Plot });
    return await movie.save();
  } catch (error) {
    return {
      error: error.message,
    };
  }
};

const getMovies = async (page = 0, size = 5) => {
  try {
    page = Number(page);
    const movies = await Movie.find()
      .skip(page * size)
      .limit(size);
    return {
      movies,
      page,
      size,
    };
  } catch (error) {
    return {
      error: error.message,
    };
  }
};

const updateMovies = async ({ movie, find, replace }) => {
  try {
    const movieDb = await Movie.findOne({ Title: { $regex: movie, $options: "i" } });
    if (movieDb) {
      let currentPlot = movieDb.Plot;
      currentPlot = currentPlot.replace(new RegExp(find, "g"), replace);
      return {
        plotUpdated: currentPlot,
        movie,
        find,
        replace,
      };
    }

    return {
      status: 404,
      message: "Movies was not found!",
    };
  } catch (error) {
    return {
      error: error.message,
    };
  }
};

module.exports = {
  createMovie,
  getMovies,
  updateMovies,
};
