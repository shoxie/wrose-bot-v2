const collector = require("../collector/");
const data = require("../collector/db.json");
module.exports = (client, message) => {
  // Ignore all bots
  if (message.author.bot) return;
  data.ignoredUsers.forEach((u) => {
    if (message.guild.id === u.guildID && message.author.id === u.userid) {
      try {
        message.delete();
      } catch (error) {
        console.log(error);
      }
    }
  });
  collector.count(
    message.author.username,
    message.content,
    message.author.id,
    message.guild.id,
    message.channel.id
  );

  // Ignore messages not starting with the prefix (in config.json)
  if (message.content.indexOf(client.config.prefix) !== 0) return;

  // Our standard argument/command name definition.
  const args = message.content
    .slice(client.config.prefix.length)
    .trim()
    .split(/ +/g);
  const command = args.shift().toLowerCase();

  // Grab the command data from the client.commands Enmap
  const cmd = client.commands.get(command);
  // console.log(cmd)
  // If that command doesn't exist, silently exit and do nothing
  if (!cmd) return;

  // Run the command
  cmd.run(client, message, args);
};
