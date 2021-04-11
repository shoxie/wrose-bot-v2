const { getGenres } = require("../../functions/tmdb");
const { MessageEmbed } = require("discord.js");
exports.run = async (client, message, args) => {
  let genres = await getGenres();
  message.channel.send("The number is the id of the genres");
  const embed = new MessageEmbed().setTitle("Available genres");
  genres.forEach((g) => {
    embed.addField(g.id, g.name, true);
  });
  await message.channel.send(embed);
};
exports.help = {
  name: "getGenres",
  usage: "getGenres",
  enabled: true,
  category: "",
  info: "Get list of genres from TMDB",
};
