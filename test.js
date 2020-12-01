// const Discord = require("discord.js");

// const client = new Discord.Client();

// client.on("message", (message) => {
//     message.author.username
// });

const moment = require('moment')

setInterval(() => {
    console.log(moment().format('DD/MM/YYYY'))
}, 1000);