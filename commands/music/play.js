exports.run = async (client, message, args) => {
  let voiceChannel = message.member.voice.channel;
  let guildID = message.guild.id;
  client.player.play(voiceChannel, args.join(" "));
  if (client.player.isPlaying(guildID)) {
    let song = await client.player.addToQueue(guildID, args.join(" "));
    song = song.song;
    message.channel.send(`${song.name} added to queue!`);
  } else {
    let song = await client.player.play(
      message.member.voice.channel,
      args.join(" "),
      message.member.user.tag
    );
    song = song.song;
    message.channel.send(
      `Currently playing ${song.name}! - Requested by ${song.requestedBy}`
    );
    await collector(client, song, guildID);
  }
  client.player
    .getQueue(guildID)
    .on("end", () => {
      message.channel.send("There is no more music in the queue!");
    })
    .on("songChanged", (oldSong, newSong) => {
      message.channel.send(`Now playing ${newSong.name}...`);
    })
    .on("channelEmpty", () => {
      message.channel.send(
        "Stop playing, there is no more member in the voice channel..."
      );
    });
};
async function collector(client, song, guildID) {
  await client.db.requestedSong.insert(song.name, guildID);
  let data = {
    status: client.player.isPlaying(guildID) ? true : false,
    queue: client.player.getQueue(guildID)
      ? client.player.getQueue(guildID)
      : null,
    currentSong: song.name,
    currentSongUrl: song.url,
    thumbnail: song.thumbnail,
  };
}
exports.help = {
  name: "play",
  usage: "play songName",
  enabled: true,
  category: "music",
};
