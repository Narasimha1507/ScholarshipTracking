import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChartComponent = ({ data, labels }) => {
  // Pie chart data
  const chartData = {
    labels: labels || ['Approved', 'Pending', 'Rejected'], // Labels for segments, fallback if none provided
    datasets: [
      {
        data: data || [50, 25, 25], // Corresponding values for each segment, fallback if none provided
        backgroundColor: ['#36A2EB', '#FFCE56', '#FF5733'], // Segment colors
        hoverBackgroundColor: ['#36A2EB', '#FFCE56', '#FF5733'], // Hover colors
      },
    ],
  };

  // Options for customizing the pie chart
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  return (
    <div>
      <Pie data={chartData} options={options} />
    </div>
  );
};

export default PieChartComponent;
