var app = require("express")();
var http = require("http").createServer(app);
var io = require("socket.io")(http);
const osu = require("node-os-utils");
const os = require("os");
require("moment-duration-format");
const moment = require("moment");
var schedule = require("node-schedule");
const collector = require("../collector");
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
    client.io = socket;
    io.emit("SERVERS", serversData);
    socket.on("getServerSpotifyData", async (guildID) => {
      let spotifyData = await client.db.spotify.getAllSpotifySongs(guildID);
      socket.emit("SPOTIFYDATA", spotifyData);
    });
    socket.on("getServerMusicData", async (guildID) => {
      let data = await client.player.getQueue(guildID);
      if (data !== undefined) {
        let package = {
          playing: "Currently playing at " + data.connection.channel.name,
          player: {
            currentSong: data.songs[0].songName,
            duration: data.duration,
            url: data.url,
            thumbnail: data.thumbnail,
            requestedBy: data.requestedBy,
          },
          songs: data.songs,
        };
        client.io.emit("SERVERMUSICDATA", package);
      } else {
        let package = {
          playing: "Not Playing",
          player: {
            currentSong: "Not Playing",
            duration: "Not Playing",
            url: "Not Playing",
            thumbnail: "Not Playing",
            requestedBy: "Not Playing",
          },
          songs: "Not Playing",
        };
        client.io.emit("SERVERMUSICDATA", package);
      }
    });
    socket.on("getChannels", async (id) => {
      let data = await client.guilds.fetch(id);

      let channels = data.channels.cache.filter((x) => x.type === "text");
      let a = [];

      channels.forEach((c) => {
        let channelData = {
          name: c.name,
          id: c.id,
        };
        a.push(channelData);
      });
      socket.emit("CHANNELS", a);
    });
    socket.on("chatToDiscord", async (data) => {
      let channel = await client.channels.fetch(data.channelid);
      channel.send(data.message);
    });
    collector.spam(client);
  });
  http.listen(3000, () => {
    console.log("listening on *:3000");
  });

  var sendData = schedule.scheduleJob("59 59 23 * *", function () {});
};
