"use client";
import React from "react";

const Dashboard = ({ transactions }) => {
  // Calculate total expenses
  const totalExpenses = transactions.reduce((sum, transaction) => sum + Number(transaction.amount), 0);

  // Group transactions by category
  const categoryTotals = transactions.reduce((acc, transaction) => {
    acc[transaction.category] = (acc[transaction.category] || 0) + Number(transaction.amount);
    return acc;
  }, {});

  // Convert category breakdown to array
  const categoryData = Object.keys(categoryTotals).map((category) => ({
    name: category,
    amount: categoryTotals[category],
  }));

  // Get most recent 5 transactions
  const recentTransactions = transactions.slice(-5).reverse();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 p-6">
      {/* Total Expenses Card */}
      <div className="bg-white p-4 rounded shadow-md">
        <h3 className="text-lg font-semibold">Total Expenses</h3>
        <p className="text-2xl font-bold text-red-500">₹{Number(totalExpenses).toFixed(2)}</p>
      </div>

      {/* Category Breakdown Card */}
      <div className="bg-white p-4 rounded shadow-md">
        <h3 className="text-lg font-semibold">Category Breakdown</h3>
        <ul className="mt-2">
          {categoryData.map((category, index) => (
            <li key={index} className="flex justify-between border-b py-1">
              <span>{category.name}</span>
              <span className="font-semibold">₹{Number(category.amount).toFixed(2)}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Recent Transactions Card */}
      <div className="bg-white p-4 rounded shadow-md">
        <h3 className="text-lg font-semibold">Recent Transactions</h3>
        <ul className="mt-2">
          {recentTransactions.map((transaction, index) => (
            <li key={index} className="flex justify-between border-b py-1">
              <span>{transaction.name}</span>
              <span className="font-semibold">₹{Number(transaction.amount).toFixed(2)}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
