const QuickChart = require("quickchart-js");
const { getMyChat } = require("../../collector/index");
exports.run = (client, message, args) => {
  let data = getMyChat(message.author.id);
  const myChart = new QuickChart();
  myChart.setConfig({
    type: "line",
    data: {
      labels: queryData.data.labels,
      steppedLine: true,
      datasets: [
        {
          label: message.guild.name + "'s top chat",
          data: queryData.data.datasets[0].data,
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
};
exports.help = {
  name: "myChat",
  usage: "myChat",
  enabled: true,
  category: "charts",
};
