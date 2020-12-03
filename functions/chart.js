const QuickChart = require("quickchart-js");

async function drawLineChart(title = "LineChart", legends = [], datasets) {
  var myChart = new QuickChart();
  myChart.setConfig({
    type: "line",
    data: {
      labels: legends,
      //   datasets: [
      //     {
      //       label: message.author.username + "'s chat history",
      //       steppedLine: true,
      //       data: queryData.data.datasets[0].data,
      //       borderColor: randomColor(),
      //       fill: false,
      //     },
      //   ],
      datasets: datasets,
    },
    options: {
      responsive: false,
      title: {
        display: true,
        text: title,
      },
    },
  });
  return myChart.getShortUrl();
}

module.exports = {
  drawLineChart,
};
