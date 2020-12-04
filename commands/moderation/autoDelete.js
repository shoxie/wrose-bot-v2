let collector = require("../../collector/index");
exports.run = async (client, message, args) => {
  if (!args[0]) return message.channel.send("no id was supplied");
  if (args[0]) {
    try {
      let member = await client.users.fetch(args[0]);
      if (!member) return message.channel.send("wrong user id");
      else {
        collector.addIgnoredUsers(member.id, message.guild.id);
      }
    } catch (error) {
      console.log(error);
    }
  }
};
exports.help = {
  name: "autoDelete",
  usage: "autoDelete",
  enabled: true,
  category: "",
};
