const { searchMovie, getMovieById } = require("../../functions/tmdb");
const { MessageEmbed } = require("discord.js");
exports.run = async (client, message, args) => {
  let keyword = encodeURIComponent(args.join(" "));
  let id = await searchMovie(keyword);
  let movie = await getMovieById(id);
  if (!id) return message.channel.send("The movie was not found");
  else {
    console.log(movie)
    const embed = new MessageEmbed()
      .setTitle(movie.title)
      .setThumbnail(`https://image.tmdb.org/t/p/w500/` + movie.poster_path)
      .addField("ID", movie.id)
      .addField('User Score', (movie.vote_average * 10) + "%")
      .addField("Overview", movie.overview)
      .addField("Genres : ", movie.genres.map((x) => x.name).join(", "))
      .addField(
        "Production companies : ",
        movie.production_companies.length !== 0
          ? movie.production_companies.map((x) => x.name).join(", ")
          : "N/A"
      )
      .addField("Release date", movie.release_date)
      .addField("Budget", movie.budget + `$`)
      .addField("Revenue", movie.revenue + `$`);
    message.channel.send(embed);
  }
};
exports.help = {
  name: "searchMovie",
  usage: "searchMovie",
  enabled: true,
  category: "",
  info: "Get a movie by name",
};
