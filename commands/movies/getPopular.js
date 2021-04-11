const { getPopular, getPopularWithGenre } = require("../../functions/tmdb");
const { MessageEmbed } = require("discord.js");
exports.run = async (client, message, args) => {
  if (!args[0]) {
    let list = await getPopular();
    const embed = new MessageEmbed().setTitle("Popular movies on TMDB");
    list.forEach((m) => {
      embed.addField(m.id, m.title, true);
    });
    message.channel.send(embed);
  }
  if (args.includes("--genre")) {
    let list = await getPopularWithGenre(args[args.indexOf("--genre") + 1]);
    const embed = new MessageEmbed().setTitle("Popular movies on TMDB");
    list.forEach((m) => {
      embed.addField(m.id, m.title, true);
    });
    message.channel.send(embed);
  }
};

exports.help = {
  name: "getPopular",
  usage: "getPopular",
  enabled: true,
  category: "",
  info: "Get list of genres from TMDB",
};
