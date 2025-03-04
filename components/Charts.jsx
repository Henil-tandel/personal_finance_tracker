import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const Charts = ({ transactions }) => {
  // Group transactions by month
  const monthlyData = transactions.reduce((acc, transaction) => {
    const month = new Date(transaction.date).toLocaleString("default", { month: "short" });
    if (!acc[month]) acc[month] = 0;
    acc[month] += Number(transaction.amount);
    return acc;
  }, {});

  // Convert to array for Recharts
  const chartData = Object.keys(monthlyData).map((month) => ({
    month,
    amount: monthlyData[month],
  }));

  return (
    <div className="bg-white p-4 rounded shadow-md mt-6">
      <h3 className="text-lg font-semibold mb-4">Monthly Expenses</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="amount" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Charts;
