const { get } = require("axios");
require("dotenv").config();
let a = [];
get(
  `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.tmdbkey}&language=en-US&page=1`
)
  .then((response) => {
    response.data.results.forEach((r) => {
      if (r.genre_ids.includes(28)) a.push(r);
    });
    console.log(a.toString());
  })
  .catch((error) => {
    console.log(error);
  });
