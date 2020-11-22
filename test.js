const Discord = require("discord.js");

const client = new Discord.Client();


client.on('message', message =>{
  message.member.voice.channel
})