const QuickChart = require("quickchart-js");

async function drawLineChart(title = "LineChart", legends = [], datasets) {
  var myChart = new QuickChart();
  myChart.setConfig({
    type: "line",
    data: {
      labels: legends,
      datasets: datasets,
    },
    options: {
      responsive: true,
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
