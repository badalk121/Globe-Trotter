import React from 'react';
import { Pie, Bar } from 'react-chartjs-2';

const Analytics = ({ budget, preferences }) => {
  const budgetData = {
    labels: ['Spent', 'Remaining'],
    datasets: [
      {
        data: [budget.spent, budget.total - budget.spent],
        backgroundColor: ['#FF6384', '#36A2EB'],
      },
    ],
  };

  const preferencesData = {
    labels: preferences.map((p) => p.type),
    datasets: [
      {
        label: 'Preferences',
        data: preferences.map((p) => p.count),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
      },
    ],
  };

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-lg font-bold mb-4">Analytics</h2>
      <div className="mb-4">
        <h3 className="font-semibold">Budget</h3>
        <Pie data={budgetData} />
      </div>
      <div>
        <h3 className="font-semibold">Preferences</h3>
        <Bar data={preferencesData} />
      </div>
    </div>
  );
};

export default Analytics;
