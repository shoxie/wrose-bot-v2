const { get } = require("axios");

const getGenres = async () => {
  return await get(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.tmdbkey}&language=en-US`
  )
    .then((response) => {
      return response.data.genres;
    })
    .catch((error) => {
      return error;
    });
};
const getPopular = async () => {
  return await get(
    `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.tmdbkey}&language=en-US&page=1`
  )
    .then((response) => {
      return response.data.results;
    })
    .catch((error) => {
      return error;
    });
};
const getPopularWithGenre = async (genreName, page = 1) => {
  let genreList = await getGenres();
  let genreId;
  genreList.forEach((e) => {
    if (e.name.toLowerCase() === genreName) {
      genreId = e.id;
    }
  });
  return await get(
    `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.tmdbkey}&with_genres=${genreId}&page=${page}`
  )
    .then((response) => {
      return response.data.results;
    })
    .catch((error) => {
      return error;
    });
};
const getMovieById = async (movieId) => {
  return await get(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.tmdbkey}&language=en-US`
  )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};
const searchMovie = async (query) => {
  return await get(
    `https://api.themoviedb.org/3/search/movie?api_key=${process.env.tmdbkey}&language=en-US&query=${query}&page=1`
  )
    .then((response) => {
      return response?.data?.results[0]?.id ?? null;
    })
    .catch((error) => {
      return error;
    });
};
module.exports = {
  getGenres,
  getPopular,
  getMovieById,
  searchMovie,
  getPopularWithGenre,
};
