exports.run = (client, message, args) => {
  const serverQueue = client.queue.get(message.guild.id);
  // message.member.voice.channel.join();
  client.player.play(message, args[0], message.member.user);
  // console.log(client.player)
};
exports.help = {
  name: "play",
  usage: "play songName",
  enabled: true,
  category: "music",
};
