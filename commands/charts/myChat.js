const QuickChart = require("quickchart-js");
const { getMyChat } = require("../../collector/index");
exports.run = async (client, message, args) => {
  let queryData = {
    type: "line",
    data: {
      labels: [],
      datasets: [{ labels: "LineChart", data: [] }],
    },
  };
  let data = getMyChat(message.author.id, message.guild.id);
  data.forEach((e) => {
    queryData.data.labels.push(e.date);
    queryData.data.datasets[0].data.push(e.count);
  });
  const myChart = new QuickChart();
  myChart.setConfig({
    type: "line",
    data: {
      labels: queryData.data.labels,
      datasets: [
        {
          label: message.author.username + "'s chat history",
          steppedLine: true,
          data: queryData.data.datasets[0].data,
          borderColor: "rgb(255, 99, 132)",
          fill: false,
        },
      ],
    },
    options: {
      responsive: true,
      title: {
        display: true,
        text: "Stepped line",
      },
    },
  });
  message.channel.send(await myChart.getShortUrl());
};
exports.help = {
  name: "myChat",
  usage: "myChat",
  enabled: true,
  category: "charts",
};
