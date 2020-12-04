exports.run = (client, message, args) => {
  try {
    if (!args[0]) return;
    if (!message.mentions.members) {
      message.channel.messages.cache.forEach((msg) => {
        if (msg.author.id === message.author.id) message.delete();
      });
    } else {
      let amount = parseInt(args[0]);
      if (!amount) return;
      message.channel.buldDelete(amount);
    }
  } catch (error) {
    console.log(error);
  }
};
exports.help = {
  name: "",
  usage: "",
  enabled: true,
  category: "",
};
