exports.run = async (client, message, args) => {
  try {
    if (!args[0]) return;
    let amount = args.filter((x) => !isNaN(x));
    if (message.mentions.members.size !== 0) {
      let user = message.mentions.members.first();
      let i = 0;
      message.channel.messages.cache.forEach((msg) => {
        if (amount[0]) {
          message.channel.messages.cache.forEach((msg) => {
            if (msg.author.id === user.id) {
              message.delete();
              i++;
            }
          });
        }
      });
    } else {
      let fetched = await message.channel.messages.fetch({ limit: amount[0] });
      await message.channel.bulkDelete(fetched);
    }
  } catch (e) {
    console.error(e);
  }
};
exports.help = {
  name: "clear",
  usage: "clear [amount]",
  enabled: true,
  category: "",
  info: "Clear a specific amount of message",
};
