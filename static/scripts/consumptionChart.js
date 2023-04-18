
const ctx = document.getElementById('consumptionChart');

const labels = ["2h34", "2h35", "2h36", "2h37", "2h38", "2h39", "2h40"];
const data = {
  labels: labels,
  datasets: [{
    label: 'My First Dataset',
    data: [65, 59, 80, 81, 56, 55, 40],
    fill: false,
    borderColor: 'rgb(75, 192, 192)',
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

function updateChart() {
  chart.data.labels.push(4);
  chart.data.datasets[0].data.push(40);
  chart.update();
}