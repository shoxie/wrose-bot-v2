const { query } = require("express");
const { getTop10 } = require("../../collector/index");
const {randomColor} = require('../../functions/random')
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
          borderColor: randomColor(),
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
  name: "topChat",
  usage: "topChat",
  enabled: true,
  category: "charts",
};
