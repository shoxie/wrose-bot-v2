var app = require("express")();
var http = require("http").createServer(app);
var io = require("socket.io")(http);
const osu = require("node-os-utils");
const os = require("os");
require("moment-duration-format");
const moment = require("moment");
module.exports = async (client) => {
  let systemInfo = {
    osType: os.type(),
    osArch: os.arch(),
    freeRam: os.freemem() / 1024 / 1024 / 1024,
    usedRam: (os.totalmem() - os.freemem()) / 1024 / 1024 / 1024,
    totalRam: os.totalmem() / 1024 / 1024 / 1024,
    uptime: moment
      .duration(os.uptime() * 1000)
      .format("D [days], H [hrs], m [mins], s [secs]"),
  };

  var clientData = {
    username: client.user.username,
    id: client.user.id,
    discriminator: client.user.discriminator,
    avatar: client.user.avatarURL(),
    systemInfo: systemInfo,
  };
  var serversData = [];
  client.guilds.cache.forEach((element) => {
    let guildsdata = {
      name: element.name,
      id: element.id,
    };
    serversData.push(guildsdata);
  });
  io.on("connection", (socket) => {
    io.emit("INITDATA", clientData);
    client.io = io;
    io.emit("SERVERS", serversData);
    socket.on("getServerSpotifyData", async (guildID) => {
      let spotifyData = await client.db.spotify.getAllSpotifySongs(guildID);
      // console.log(spotifyData);
      socket.emit("SPOTIFYDATA", spotifyData);
    });
    socket.on("getServerMusicData", async (guildID) => {
      console.log("clinet call");
      let data = await client.player.getQueue(guildID);
      let package = {
        playing:
          data !== undefined
            ? "Playing at " + data.channel.name
            : "Not playing",
        player: {
          currentSong: data !== undefined ? data.songs[0].songName : null,
          duration: data !== undefined ? data.duration : null,
          url: data !== undefined ? data.url : null,
          thumbnail: data !== undefined ? data.thumbnail : null,
          requestedBy: data !== undefined ? data.requestedBy : null,
        },
        songs: data !== undefined ? data.songs : null,
      };
      console.log(package);
      socket.emit("SENDSERVERMUSICDATA", package);
    });
  });
  http.listen(3000, () => {
    console.log("listening on *:3000");
  });
  module.exports = io;
};
