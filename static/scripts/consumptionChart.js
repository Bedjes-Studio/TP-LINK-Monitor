const ctx = document.getElementById('consumptionChart');

const chartColors = {  red: 'rgb(255, 99, 132)',   orange: 'rgb(255, 159, 64)',    yellow: 'rgb(255, 205, 86)',    green: 'rgb(75, 192, 192)',     blue: 'rgb(54, 162, 235)',  purple: 'rgb(153, 102, 255)',   grey: 'rgb(201, 203, 207)' }; 
let threshholds = {suspicious: 50, suspect: 100}
const labels = [];
const data = {
  labels: labels,
  datasets: [{
    label: 'Consommation usuelle',
    data: [],
    fill: false,
    borderColor: chartColors.blue,
    tension: 0.1
  }, {
    label: 'Consommation suspecte',
    data: [],
    fill: false,
    borderColor: chartColors.yellow,
    tension: 0.1
  }, {
    label: 'Consommation risquée',
    data: [],
    fill: false,
    borderColor: chartColors.red,
    tension: 0.1
  }]
};

const chart = new Chart(ctx, {
    type: 'line',
    data: data,
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
});

function addDataToRightDataset(value) {
  let arrayIndex;
  if (value <= threshholds.suspicious) {
    arrayIndex = 0;
    chart.data.datasets[1].data.push(NaN);
    chart.data.datasets[2].data.push(NaN);
  }
  else if (value <= threshholds.suspect) {
    arrayIndex = 1;
    chart.data.datasets[0].data.push(NaN);
    chart.data.datasets[2].data.push(NaN);
  }
  else {
    arrayIndex = 2;
    chart.data.datasets[1].data.push(NaN);
    chart.data.datasets[0].data.push(NaN);
  }
  chart.data.datasets[arrayIndex].data.push(value);
  console.log("Added data " + value + " to array " + arrayIndex);
}

function updateChart(values, timestamps) {
  let currentMaxIndex = chart.data.labels.length;
  if (timestamps.length == undefined) {
    console.log("CONSUMPTION CHART: There is no data to be added");
  }
  else {
    for (i = 0; i < timestamps.length - currentMaxIndex; i++)
    {
      chart.data.labels.push(timestamps[currentMaxIndex + i])
      let value = values[currentMaxIndex + i];
      addDataToRightDataset(value);
    }
  }
  chart.update();
}