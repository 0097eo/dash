import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Banknote, Users, Activity } from 'lucide-react';

// data generation
const generateDummyData = () => {
  const months = ['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'];
  return months.map(month => ({
    name: month,
    sales: Math.floor(Math.random() * 1000000) + 500000,
  }));
};

const generateTransactions = () => {
  const transactions = [];
  for (let i = 0; i < 5; i++) {
    transactions.push({
      id: i + 1,
      date: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toLocaleDateString(),
      amount: Math.floor((Math.random() * 100000 + 10000)),
      status: Math.random() > 0.5 ? 'Completed' : 'Pending',
    });
  }
  return transactions;
};

const Dashboard = () => {
  const chartData = generateDummyData();
  const transactions = generateTransactions();

  // Calculate average monthly revenue
  const totalSales = chartData.reduce((sum, data) => sum + data.sales, 0);
  const averageMonthlyRevenue = Math.round(totalSales / chartData.length);

  return (
    <div className="bg-gray-100 min-h-screen">
      <main className="p-4 md:p-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">Overview</h2>

        {/* Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8">
          <div className="bg-white p-4 md:p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <h3 className="text-base md:text-lg font-semibold">Total Sales</h3>
              <Banknote size={24} className="text-green-500" />
            </div>
            <p className="text-xl md:text-3xl font-bold mt-2">KSh 24,567,000</p>
          </div>
          <div className="bg-white p-4 md:p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <h3 className="text-base md:text-lg font-semibold">Active Users</h3>
              <Users size={24} className="text-blue-500" />
            </div>
            <p className="text-xl md:text-3xl font-bold mt-2">1,234</p>
          </div>
          <div className="bg-white p-4 md:p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <h3 className="text-base md:text-lg font-semibold">Monthly Revenue</h3>
              <Activity size={24} className="text-purple-500" />
            </div>
            <p className="text-xl md:text-3xl font-bold mt-2">KSh {averageMonthlyRevenue.toLocaleString()}</p>
          </div>
        </div>

        {/* Chart */}
        <div className="bg-white p-4 md:p-6 rounded-lg shadow mb-8">
          <h3 className="text-lg md:text-xl font-semibold mb-4">Sales Trend</h3>
          <div className="h-64 md:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => `KSh ${value.toLocaleString()}`} />
                <Bar dataKey="sales" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="bg-white p-4 md:p-6 rounded-lg shadow">
          <h3 className="text-lg md:text-xl font-semibold mb-4">Recent Transactions</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2 md:p-3">ID</th>
                  <th className="p-2 md:p-3">Date</th>
                  <th className="p-2 md:p-3">Amount</th>
                  <th className="p-2 md:p-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map(transaction => (
                  <tr key={transaction.id} className="border-b">
                    <td className="p-2 md:p-3">{transaction.id}</td>
                    <td className="p-2 md:p-3">{transaction.date}</td>
                    <td className="p-2 md:p-3">KSh {transaction.amount.toLocaleString()}</td>
                    <td className="p-2 md:p-3">
                      <span className={`px-2 py-1 rounded text-xs md:text-sm ${
                        transaction.status === 'Completed' ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'
                      }`}>
                        {transaction.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;