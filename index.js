const Discord = require("discord.js");
require("dotenv").config();
const Enmap = require("enmap");
const fs = require("fs");
var app = require("express")();
var http = require("http").createServer(app);
var io = require("socket.io")(http);
const client = new Discord.Client({ disableEveryone: true });
const config = require("./config/config.json");
const { Player } = require("discord-music-player");
const mongoose = require("mongoose");
let db = require("./model/");
// Create a new Player (you don't need any API Key)
const player = new Player(client);
// To easily access the player
client.player = player;
client.config = config;
client.io = io;
fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach((file) => {
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, event.bind(null, client));
  });
});
client.commands = new Enmap();
client.categories = new Enmap();
client.queue = new Enmap();
fs.readdir("./commands/", (err, files) => {
  if (err) return console.error(err);
  files.forEach((file) => {
    if (file.endsWith(".js")) {
      return;
    }
    client.categories.set(file, file);
    getjs(`./commands/${file}/`);
  });
});

function getjs(directory) {
  fs.readdir(directory, (err, files) => {
    if (err) return console.error(err);
    files.forEach((file1) => {
      if (!file1.endsWith(".js")) {
        return;
      }
      let props = require(`${directory}/${file1}`);
      let commandName = file1.split(".")[0];
      console.log(`Attempting to load command ${commandName}`);
      client.commands.set(commandName, props);
    });
  });
}
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    client.db = db;
    console.log("CONNECTED DIT CON ME MAY");
  });

client.login(process.env.token);
