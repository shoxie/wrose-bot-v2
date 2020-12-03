const QuickChart = require("quickchart-js");
const { getOneUser } = require("../../collector/index");
const { randomColor } = require("../../functions/random");
const { drawLineChart } = require("../../functions/chart");
exports.run = async (client, message, args) => {
  if (!message.mentions.members.first()) {
    console.log("no id");
    let queryData = {
      type: "line",
      data: {
        labels: [],
        datasets: [
          {
            label: "LineChart",
            data: [],
            borderColor: randomColor(),
            fill: false,
          },
        ],
      },
    };
    let data = getOneUser(message.author.id, message.guild.id);
    data.forEach((e) => {
      queryData.data.labels.push(e.date);
      queryData.data.datasets[0].data.push(e.count);
    });
    message.channel.send(
      await drawLineChart(
        "Chat",
        queryData.data.labels,
        queryData.data.datasets
      )
    );
  }
  if (args.length > 0) {
    let legends = [],
      temp = [],
      datasets = [],
      username;
    message.mentions.members.forEach(async (member) => {
      // wrose, tester
      let chatData = getOneUser(member.user.id, message.guild.id); //wrose
      chatData.forEach(async (mem) => {
        if (!legends.includes(mem.date)) legends.push(mem.date);
        temp.push(mem.count);
        username = mem.name;
        // let { id, username } = await client.users.fetch(message.author.id);
      });
      let data = {
        label: username,
        steppedLine: true,
        data: [...temp],
        borderColor: randomColor(),
        fill: false,
      };
      datasets.push(data);
      temp = [];
      username = "";
    });
    message.channel.send(await drawLineChart("Chat", legends, datasets));
  }
};
exports.help = {
  name: "myChat",
  usage: "myChat",
  enabled: true,
  category: "charts",
};
