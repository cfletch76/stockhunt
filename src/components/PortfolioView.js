import React, { useState } from 'react';
import { ArrowUp, ArrowDown, DollarSign, PieChart, TrendingUp, AlertTriangle } from 'lucide-react';
import { PieChart as RePieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const MetricCard = ({ title, value, change, icon }) => (
  <div className="bg-white rounded-lg shadow p-4">
    <div className="flex justify-between items-center mb-2">
      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      {icon}
    </div>
    <p className="text-2xl font-bold text-gray-900">{value}</p>
    {change && (
      <p className={`text-sm ${change >= 0 ? 'text-green-600' : 'text-red-600'} flex items-center`}>
        {change >= 0 ? <ArrowUp size={16} className="mr-1" /> : <ArrowDown size={16} className="mr-1" />}
        {Math.abs(change)}%
      </p>
    )}
  </div>
);

const mockHoldings = [
  { symbol: 'AAPL', name: 'Apple Inc.', shares: 50, avgCost: 150, currentPrice: 175, value: 8750, gain: 1250, gainPercent: 16.67 },
  { symbol: 'MSFT', name: 'Microsoft Corporation', shares: 30, avgCost: 200, currentPrice: 220, value: 6600, gain: 600, gainPercent: 10 },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', shares: 10, avgCost: 2000, currentPrice: 2200, value: 22000, gain: 2000, gainPercent: 10 },
  { symbol: 'AMZN', name: 'Amazon.com Inc.', shares: 5, avgCost: 3000, currentPrice: 3300, value: 16500, gain: 1500, gainPercent: 10 },
  { symbol: 'FB', name: 'Meta Platforms Inc.', shares: 20, avgCost: 250, currentPrice: 300, value: 6000, gain: 1000, gainPercent: 20 },
];

const sectorAllocation = [
  { name: 'Technology', value: 45 },
  { name: 'Consumer Cyclical', value: 25 },
  { name: 'Communication Services', value: 15 },
  { name: 'Healthcare', value: 10 },
  { name: 'Financials', value: 5 },
];

const performanceData = [
  { date: '2023-01-01', value: 100000 },
  { date: '2023-02-01', value: 102000 },
  { date: '2023-03-01', value: 105000 },
  { date: '2023-04-01', value: 103000 },
  { date: '2023-05-01', value: 106000 },
  { date: '2023-06-01', value: 110000 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const PortfolioView = () => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

  const sortedHoldings = [...mockHoldings].sort((a, b) => {
    if (sortConfig.key) {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
    }
    return 0;
  });

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const totalValue = mockHoldings.reduce((sum, holding) => sum + holding.value, 0);
  const totalGain = mockHoldings.reduce((sum, holding) => sum + holding.gain, 0);
  const totalGainPercent = (totalGain / (totalValue - totalGain)) * 100;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Your Portfolio</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <MetricCard 
          title="Total Value" 
          value={`$${totalValue.toLocaleString()}`} 
          icon={<DollarSign size={24} className="text-blue-500" />} 
        />
        <MetricCard 
          title="Total Gain/Loss" 
          value={`$${totalGain.toLocaleString()}`} 
          change={totalGainPercent.toFixed(2)} 
          icon={<TrendingUp size={24} className="text-green-500" />} 
        />
        <MetricCard 
          title="Day's Change" 
          value="$1,250" 
          change={1.2} 
          icon={<TrendingUp size={24} className="text-orange-500" />} 
        />
        <MetricCard 
          title="Cash Balance" 
          value="$10,000" 
          icon={<DollarSign size={24} className="text-gray-500" />} 
        />
      </div>

      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Holdings</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 cursor-pointer" onClick={() => requestSort('symbol')}>Symbol</th>
                <th className="p-2 cursor-pointer" onClick={() => requestSort('name')}>Name</th>
                <th className="p-2 cursor-pointer" onClick={() => requestSort('shares')}>Shares</th>
                <th className="p-2 cursor-pointer" onClick={() => requestSort('avgCost')}>Avg Cost</th>
                <th className="p-2 cursor-pointer" onClick={() => requestSort('currentPrice')}>Current Price</th>
                <th className="p-2 cursor-pointer" onClick={() => requestSort('value')}>Value</th>
                <th className="p-2 cursor-pointer" onClick={() => requestSort('gain')}>Gain/Loss</th>
                <th className="p-2 cursor-pointer" onClick={() => requestSort('gainPercent')}>Gain/Loss %</th>
              </tr>
            </thead>
            <tbody>
              {sortedHoldings.map((holding) => (
                <tr key={holding.symbol} className="border-t">
                  <td className="p-2 font-semibold">{holding.symbol}</td>
                  <td className="p-2">{holding.name}</td>
                  <td className="p-2">{holding.shares}</td>
                  <td className="p-2">${holding.avgCost.toFixed(2)}</td>
                  <td className="p-2">${holding.currentPrice.toFixed(2)}</td>
                  <td className="p-2">${holding.value.toLocaleString()}</td>
                  <td className={`p-2 ${holding.gain >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    ${holding.gain.toLocaleString()}
                  </td>
                  <td className={`p-2 ${holding.gainPercent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {holding.gainPercent.toFixed(2)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Sector Allocation</h2>
          <ResponsiveContainer width="100%" height={300}>
            <RePieChart>
              <Pie
                data={sectorAllocation}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {sectorAllocation.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </RePieChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Portfolio Performance</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-yellow-100 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-yellow-800 mb-4 flex items-center">
          <AlertTriangle size={24} className="mr-2" />
          Portfolio Alerts
        </h2>
        <ul className="space-y-2">
          <li className="flex items-start">
            <AlertTriangle size={20} className="text-yellow-500 mr-2 mt-1" />
            <span>Your portfolio is heavily weighted towards the Technology sector (45%). Consider diversifying to reduce risk.</span>
          </li>
          <li className="flex items-start">
            <AlertTriangle size={20} className="text-yellow-500 mr-2 mt-1" />
            <span>AAPL (Apple Inc.) makes up 25% of your portfolio. Consider rebalancing to reduce single-stock risk.</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default PortfolioView;