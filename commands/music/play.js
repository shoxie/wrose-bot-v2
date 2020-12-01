exports.run = async (client, message, args) => {
  let voiceChannel = message.member.voice.channel;
  let guildID = message.guild.id;
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
    // await collector(client, song, guildID);
    let package = {
      playing: "Currently playing at " + message.channel.name,
      player: {
        currentSong: song.name,
        duration: song.duration,
        url: song.url,
        thumbnail: song.thumbnail,
        requestedBy: song.requestedBy,
      },
      songs: "1",
      //  client.player.getQueue(guildID).songs,
    };
    client.io.emit("SERVERMUSICDATA", package);
  }
  client.player
    .getQueue(guildID)
    .on("end", () => {
      // client.io.emit("SERVERMUSICDATA", package);
      message.channel.send("There is no more music in the queue!");
    })
    .on("songChanged", (oldSong, newSong) => {
      // client.io.emit("SERVERMUSICDATA", package);
      message.channel.send(`Now playing ${newSong.name}...`);
    })
    .on("channelEmpty", () => {
      // client.io.emit("SERVERMUSICDATA", package);
      message.channel.send(
        "Stop playing, there is no more member in the voice channel..."
      );
    });
};
async function collector(client, song, guildID) {
  await client.db.requestedSong.insert(song.name, guildID);
}
exports.help = {
  name: "play",
  usage: "play songName",
  enabled: true,
  category: "music",
};
