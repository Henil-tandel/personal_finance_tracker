'use client';
import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import Charts from "@/components/Charts";
import Dashboard from "@/components/Dashboard";

export default function Home() {
  const predefinedCategories = [
    "Food", "Transport", "Shopping", "Bills", "Entertainment", "Health",  "Other"
  ];
  const [transactions, setTransactions] = useState([]);
  const [form, setForm] = useState({ amount: "", date: "", description: "", category: ""   });
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/transactions");
      const result = await response.json();
      if (result.success) {
        setTransactions(result.data);
      } else {
        setError(result.error || "Failed to fetch transactions.");
      }
    } catch {
      setError("Network error. Please try again.");
    }
    setLoading(false);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.amount || !form.date || !form.description || !form.category) {
      setError("All fields are required!");
      return;
    }
    setError("");

    const method = editId ? "PUT" : "POST";
    const body = editId ? { id: editId, ...form } : form;

    try {
      const response = await fetch("/api/transactions", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const result = await response.json();
      if (result.success) {
        fetchTransactions();
        setForm({ amount: "", date: "", description: "" , category: ""});
        setEditId(null);
      } else {
        setError(result.error || "Failed to save transaction.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    }
  };

  const handleEdit = (transaction) => {
    setForm(transaction);
    setEditId(transaction._id);
  };
  
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this transaction?")) return;
    
    try {
      const response = await fetch(`/api/transactions?id=${id}`, { method: "DELETE" });
      const result = await response.json();

      if (result.success) {
        fetchTransactions();
      } else {
        setError(result.error || "Failed to delete transaction.");
      }
    } catch {
      setError("Could not delete. Try again.");
    }
  };

  return (
    <>
      <Header />
      <div className="container mx-auto p-6 max-w-xl md:max-w-3xl lg:max-w-5xl">

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">
            {error}
          </div>
        )}

        {/* Transaction Form */}
        <form className="mb-4 bg-gray-100 p-4 rounded" onSubmit={handleSubmit}>
          <div className="mb-2">
            <input type="number" name="amount" value={form.amount} onChange={handleChange} placeholder="Amount"
              className="w-full p-2 border rounded focus:ring-2 focus:ring-green-400" />
          </div>
          <div className="mb-2">
            <input type="date" name="date" value={form.date} onChange={handleChange}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-green-400" />
          </div>
          <div className="mb-2">
            <input type="text" name="description" value={form.description} onChange={handleChange} placeholder="Description"
              className="w-full p-2 border rounded focus:ring-2 focus:ring-green-400" />
          </div>
          <div className="mb-2">
            <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-green-400"
            >
            <option value="">Select Category</option>
            {predefinedCategories.map((category) => (
            <option key={category} value={category}>{category}</option>
            ))}
            </select>
            </div>
          <button type="submit" className="bg-green-500 hover:bg-green-600 text-white p-2 rounded w-full md:w-auto">
            {editId ? "Update" : "Add"} Transaction
          </button>
        </form>

        {/* Loading State */}
        {loading && <p className="text-gray-500 text-center">Loading transactions...</p>}

        {/* Transactions List */}
        {!loading && (
          <ul className="bg-white p-4 rounded shadow-md">
            {transactions.length === 0 ? (
              <p className="text-gray-500 text-center">No transactions found.</p>
            ) : (
              transactions.map((transaction) => (
                <li key={transaction._id} className="flex flex-col md:flex-row justify-between p-2 border-b items-center text-center md:text-left">
                  <span>{transaction.date} - ₹{transaction.amount} - {transaction.description} ({transaction.category})</span>
                  <div className="mt-2 md:mt-0">
                    <button className="text-blue-500 hover:text-blue-700 mr-2" onClick={() => handleEdit(transaction)}>Edit</button>
                    <button className="text-red-500 hover:text-red-700" onClick={() => handleDelete(transaction._id)}>Delete</button>
                  </div>
                </li>
              ))
              
            )}
          </ul>
        )}
      </div>
      {/* Dashboard Summary Cards */}
      <Dashboard transactions={transactions} />
      <Charts transactions={transactions} />
    </>
  );
}
