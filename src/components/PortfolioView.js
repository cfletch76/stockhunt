import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { ArrowUp, ArrowDown, DollarSign, TrendingUp, AlertTriangle } from 'lucide-react';

const performanceData = [
  { date: '2023-01-01', value: 100000 },
  { date: '2023-02-01', value: 105000 },
  { date: '2023-03-01', value: 102000 },
  { date: '2023-04-01', value: 108000 },
  { date: '2023-05-01', value: 112000 },
  { date: '2023-06-01', value: 115000 },
];

const holdings = [
  { symbol: 'AAPL', name: 'Apple Inc.', shares: 50, avgCost: 150, currentPrice: 175, value: 8750, gain: 1250 },
  { symbol: 'MSFT', name: 'Microsoft Corp.', shares: 30, avgCost: 200, currentPrice: 220, value: 6600, gain: 600 },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', shares: 10, avgCost: 2000, currentPrice: 2200, value: 22000, gain: 2000 },
  { symbol: 'AMZN', name: 'Amazon.com Inc.', shares: 20, avgCost: 3000, currentPrice: 3300, value: 66000, gain: 6000 },
];

const sectorAllocation = [
  { name: 'Technology', value: 45 },
  { name: 'Healthcare', value: 20 },
  { name: 'Finance', value: 15 },
  { name: 'Consumer Goods', value: 10 },
  { name: 'Energy', value: 10 },
];

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name, value }) => {
  const RADIAN = Math.PI / 180;
  const radius = outerRadius * 1.2;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text 
      x={x} 
      y={y} 
      fill="black"
      textAnchor={x > cx ? 'start' : 'end'} 
      dominantBaseline="central"
    >
      {`${name} ${value}%`}
    </text>
  );
};

const PortfolioView = () => {
  const totalValue = holdings.reduce((sum, holding) => sum + holding.value, 0);
  const totalGain = holdings.reduce((sum, holding) => sum + holding.gain, 0);
  const gainPercentage = (totalGain / (totalValue - totalGain)) * 100;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Portfolio Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <MetricCard title="Total Value" value={`$${totalValue.toLocaleString()}`} icon={<DollarSign size={24} className="text-blue-500" />} />
        <MetricCard title="Total Gain/Loss" value={`$${totalGain.toLocaleString()}`} change={gainPercentage.toFixed(2)} icon={<TrendingUp size={24} className="text-green-500" />} />
        <MetricCard title="Day's Change" value="+$2,500" change={1.25} icon={<TrendingUp size={24} className="text-green-500" />} />
        <MetricCard title="Cash Balance" value="$10,000" icon={<DollarSign size={24} className="text-blue-500" />} />
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Holdings</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 text-left">Symbol</th>
                <th className="py-2 px-4 text-left">Name</th>
                <th className="py-2 px-4 text-right">Shares</th>
                <th className="py-2 px-4 text-right">Avg Cost</th>
                <th className="py-2 px-4 text-right">Current Price</th>
                <th className="py-2 px-4 text-right">Value</th>
                <th className="py-2 px-4 text-right">Gain/Loss</th>
              </tr>
            </thead>
            <tbody>
              {holdings.map((holding) => (
                <tr key={holding.symbol} className="border-b">
                  <td className="py-2 px-4">{holding.symbol}</td>
                  <td className="py-2 px-4">{holding.name}</td>
                  <td className="py-2 px-4 text-right">{holding.shares}</td>
                  <td className="py-2 px-4 text-right">${holding.avgCost.toFixed(2)}</td>
                  <td className="py-2 px-4 text-right">${holding.currentPrice.toFixed(2)}</td>
                  <td className="py-2 px-4 text-right">${holding.value.toLocaleString()}</td>
                  <td className={`py-2 px-4 text-right ${holding.gain >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    ${Math.abs(holding.gain).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Sector Allocation</h2>
          <div className="bg-white p-4 rounded-lg shadow" style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sectorAllocation}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={renderCustomizedLabel}
                  //label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                  //labelLine={true}
                >
                  {sectorAllocation.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={`hsl(${index * 45}, 70%, 60%)`} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>      
        <div>
          <h2 className="text-xl font-semibold mb-4">Portfolio Performance</h2>
          <div className="bg-white p-4 rounded-lg shadow" style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#4f46e5" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Portfolio Alerts</h2>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center mb-2">
            <AlertTriangle size={20} className="text-yellow-500 mr-2" />
            <span>Your portfolio is heavily weighted in the Technology sector (45%). Consider diversifying.</span>
          </div>
          <div className="flex items-center">
            <AlertTriangle size={20} className="text-yellow-500 mr-2" />
            <span>AAPL is approaching your target sell price of $180. Consider reviewing your position.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

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

export default PortfolioView;