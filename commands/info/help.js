const Pagination = require("discord-paginationembed");

exports.run = (client, message, args) => {
  if (args.length === 0) {
    message.channel.send({
      embed: {
        title: "help 4 u m8",
        color: "ffffff",
        fields: [
          {
            name: "Prefix",
            value: client.config.prefix,
          },
          {
            name: "Name",
            value: client.user.username,
          },
          {
            name: "ID",
            value: client.user.id,
          },
        ],
        thumbnail: {
          url: client.user.avatarURL(),
        },
      },
    });
  }
  if (args.length === 1) {
    if (client.commands.has(args[0])) {
      let data = client.commands.get(args[0]);
      message.channel.send({
        embed: {
          title: "Help for the command",
          fields: [
            {
              name: "Command name",
              value: data.help.name,
            },
            {
              name: "Command usage",
              value: data.help.usage,
            },
            {
              name: "Active status",
              value: data.help.enabled === true ? "Yes" : "No",
            },
            {
              name: "Information",
              value: data.help?.info ?? "Not configured",
            },
          ],
          thumbnail: {
            url: client.user.avatarURL(),
          },
        },
      });
    }
    if (client.categories.has(args[0])) {
      message.channel.send("Sending list of commands for " + args[0]);
      const embeds = [];
      client.commands.forEach((command) => {
        if (command.help.category === args[0]) {
          const status = command.help.enabled ? "✅" : "❌";
          const data = {
            name: command.help.name,
            usage: command.help.usage,
            status: status,
          };
          embeds.push(data);
          embeds.sort(function (a, b) {
            var textA = a.name;
            var textB = b.name;
            return textA < textB ? -1 : textA > textB ? 1 : 0;
          });
          send();
          async function send() {
            const commands = new Pagination.FieldsEmbed()
              .setArray(embeds)
              .setAuthorizedUsers([])
              .setChannel(message.channel)
              .setPageIndicator(true)
              .formatField("Name", (i) => i.name + "\n")
              .formatField("Usage", (i) => i.usage + "\n")
              .formatField("Status", (i) => i.status + "\n")
              .setDeleteOnTimeout(true)
              .setElementsPerPage(10)
              .setEmojisFunctionAfterNavigation(true);
            commands.embed
              .setThumbnail(
                client.user.avatarURL({
                  format: "png",
                  dynamic: true,
                  size: 1024,
                })
              )
              .setColor("#0390fc")
              .setFooter("Created by wrose");
            await commands.build();
          }
        }
      });
    }
  }
};
exports.help = {
  name: "help",
  usage: "help [commandname] || [categoryname]",
  enabled: true,
  category: "info",
};
