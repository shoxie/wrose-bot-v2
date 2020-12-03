const collector = require("../../collector/index");
exports.run = async (client, message, args) => {
  var channel = await client.channels.fetch(args[0]);
  if (!args[0])
    return message.channel.send("id was wrong or it was not supplied");
  if (!channel)
    return message.channel.send("id was wrong or it was not supplied");
  else {
    collector.addIgnore(args[0]);
    message.channel.send(
      "All messages after this point in " +
        channel.name +
        " will not be counted"
    );
  }
};
exports.help = {
  name: "ignoreCount",
  usage: "ignoreCount [textchannel id]",
  enabled: true,
  category: "moderation",
};
