import React, { useState, useRef } from 'react';
import { BarChart, Sector, Bar, LineChart, Line, PieChart, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { Users, List, Banknote } from 'lucide-react';

const Reports = () => {
  const [reportType, setReportType] = useState('overview');
  const [activeIndex, setActiveIndex] = useState(0);
  const reportRef = useRef(null); // Ref for the report section

  const overviewData = [
    { month: 'Mar', sales: 4000, users: 1000, growth: 5 },
    { month: 'Apr', sales: 3000, users: 1200, growth: 3 },
    { month: 'May', sales: 5000, users: 1100, growth: 7 },
    { month: 'Jun', sales: 4500, users: 1300, growth: 4 },
    { month: 'Jul', sales: 6000, users: 1500, growth: 8 },
    { month: 'Aug', sales: 5500, users: 1400, growth: 6 },
  ];

  const salesData = [
    { category: 'Electronics', value: 4280540 },
    { category: 'Clothing', value: 3735292 },
    { category: 'Books', value: 2534372 },
    { category: 'Home & Garden', value: 2783220 },
    { category: 'Toys', value: 1893450 },
  ];

  const userGrowthData = [
    { month: 'Jan', organic: 800, paid: 200 },
    { month: 'Feb', organic: 950, paid: 250 },
    { month: 'Mar', organic: 850, paid: 250 },
    { month: 'Apr', organic: 1000, paid: 300 },
    { month: 'May', organic: 1200, paid: 300 },
    { month: 'Jun', organic: 1100, paid: 300 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  const renderActiveShape = (props) => {
    const RADIAN = Math.PI / 180;
    const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';

    return (
      <g>
        <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
          {payload.category}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={fill}
        />
        <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`Value ${value}`}</text>
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
          {`(${(percent * 100).toFixed(2)}%)`}
        </text>
      </g>
    );
  };

  const onPieEnter = (data, index) => {
    setActiveIndex(index);
    console.log('Category:', data.category);
  };

  const renderReport = () => {
    switch (reportType) {
      case 'overview':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
              <h3 className="text-lg sm:text-xl font-semibold mb-4 flex items-center">
                <Banknote className="mr-2" /> Sales Overview
              </h3>
              <div className="h-64 sm:h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={overviewData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="sales" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
              <h3 className="text-lg sm:text-xl font-semibold mb-4 flex items-center">
                <Users className="mr-2" /> User Growth
              </h3>
              <div className="h-64 sm:h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={overviewData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="users" stroke="#82ca9d" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        );
      case 'sales':
        return (
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
            <h3 className="text-lg sm:text-xl font-semibold mb-4 flex items-center">
              <Banknote className="mr-2" /> Sales by Category
            </h3>
            <div className="h-64 sm:h-96">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    activeIndex={activeIndex}
                    activeShape={renderActiveShape}
                    data={salesData}
                    cx="50%"
                    cy="50%"
                    innerRadius="30%"
                    outerRadius="60%"
                    fill="#8884d8"
                    dataKey="value"
                    onMouseEnter={onPieEnter}
                  >
                    {salesData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        );
      case 'users':
        return (
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
            <h3 className="text-lg sm:text-xl font-semibold mb-4 flex items-center">
              <Users className="mr-2" /> User Acquisition
            </h3>
            <div className="h-64 sm:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={userGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="organic" stackId="a" fill="#82ca9d" />
                  <Bar dataKey="paid" stackId="a" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const handlePrint = () => {
    window.print(); // Opens browser's print dialog
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6">Analytics</h2>
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
          <select
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}
            className="p-2 border rounded w-full sm:w-auto"
          >
            <option value="overview">Overview</option>
            <option value="sales">Sales Report</option>
            <option value="users">User Growth Report</option>
          </select>
        </div>
        <button 
          onClick={handlePrint} // Trigger the print function
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center w-full sm:w-auto justify-center"
        >
          <List className="mr-2" /> Generate Report
        </button>
      </div>
      <div ref={reportRef}>{renderReport()}</div> {/* Printable section */}
    </div>
  );
};

export default Reports;
