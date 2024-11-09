// Constants
const k = 8.99e9; // Coulomb's constant in N m²/C²
const Q = 2e-9; // Total charge in C
const L = 1.0; // Length of the rod in meters
const a = 0.5; // Distance from the end of the rod to point P in meters

// Chart setup
const ctx = document.getElementById('electricFieldChart').getContext('2d');
const electricFieldChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: [],
    datasets: [
      {
        label: 'Calculated Electric Field (N/C)',
        data: [],
        borderColor: '#4caf50',
        backgroundColor: 'rgba(76, 175, 80, 0.3)',
        fill: true,
        tension: 0.2,
      },
    ],
  },
  options: {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Number of Pieces',
          color: '#e0e0e0',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Electric Field (N/C)',
          color: '#e0e0e0',
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: '#e0e0e0',
        },
      },
    },
  },
});

function calculateElectricField() {
  const n = parseInt(document.getElementById('pieces').value);
  const dq = Q / n; // Charge per piece
  let electricField = 0;

  for (let i = 0; i < n; i++) {
    const x = (L / n) * i;
    const lambda = (Q / L) * (x / L); // Nonuniform linear charge density λ = αx
    const dq_i = lambda * (L / n); // Small charge element
    const r_i = a + x; // Distance from dq_i to point P
    electricField += (k * dq_i) / (r_i * r_i);
  }

  const outputDiv = document.getElementById('output');
  outputDiv.innerHTML = `
        Electric Field at P with ${n} pieces: <span style="color:#4caf50; text-shadow: 0 0 10px #4caf50;">
        ${electricField.toFixed(2)} N/C</span>
    `;

  // Update Chart
  electricFieldChart.data.labels.push(n);
  electricFieldChart.data.datasets[0].data.push(electricField);
  electricFieldChart.update();
}
