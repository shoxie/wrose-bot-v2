const { query } = require("express");
const { getTop10 } = require("../../collector/index");
const QuickChart = require("quickchart-js");

exports.run = async (client, message, args) => {
  let queryData = {
    type: "line",
    data: {
      labels: [],
      datasets: [{ labels: "LineChart", data: [] }],
    },
  };
  let data = getTop10(message.guild.id);
  console.log(data);
  data.forEach((e) => {
    if (e.name.length > 14) {
      e.name = e.name.slice(0, 13);
    }
    queryData.data.labels.push(e.name);
    queryData.data.datasets[0].data.push(e.count);
  });
  const myChart = new QuickChart();
  myChart.setConfig({
    type: "bar",
    data: {
      labels: queryData.data.labels,
      datasets: [
        {
          label: message.guild.name + "'s top chat",
          data: queryData.data.datasets[0].data,
        },
      ],
    },
  });
  message.channel.send(await myChart.getShortUrl());
};
exports.help = {
  name: "topChat",
  usage: "topChat",
  enabled: true,
  category: "",
};
