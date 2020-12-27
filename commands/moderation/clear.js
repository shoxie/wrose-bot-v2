exports.run = (client, message, args) => {
  try {
    if (!args[0]) return;
    else if (message.mentions) {
      let amount = 
      let user = message.mentions.members.first();
      let i = 0;
      message.channel.messages.cache.forEach((msg) => {
        if(amount) {
          message.channel.messages.cache.forEach(msg => {
            
          })
        }
        if (msg.author.id === user.id) {
          message.delete();
          i++;
        }
      });
    }
  } catch (e) {
    console.log(e);
  }
};
exports.help = {
  name: "",
  usage: "",
  enabled: true,
  category: "",
};
