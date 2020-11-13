var app = require("express")();
var http = require("http").createServer(app);
var io = require("socket.io")(http);
module.exports = (client) => {
  var clientData = {
    username: client.user.username,
    id: client.user.id,
    discriminator: client.user.discriminator,
    avatar: client.user.avatarURL(),
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
    socket.on("getServerData", (data) => {
      let serverQueue = client.queue.get(data);
      let a = client.guilds.cache.get(data)
      let server = {};
      server.stats = {
        name: a.name,
        members: a.memberCount
      }
      server.playing = {
        playing: serverQueue ? serverQueue.queue[0].name : "Not playing",
        queue: serverQueue ? serverQueue.queue : [],
      };
      console.log(server);
      socket.emit("SERVERDATA", server);
    });
  });
};
http.listen(3000, () => {
  console.log("listening on *:3000");
});
