import React from 'react';
import { ArrowUp, ArrowDown, DollarSign, TrendingUp, Activity } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const DashboardCard = ({ title, value, change, icon }) => (
  <div className="bg-white rounded-lg shadow p-4">
    <div className="flex justify-between items-center mb-2">
      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      {icon}
    </div>
    <p className="text-2xl font-bold text-gray-900">{value}</p>
    {change && (
      <p className={`text-sm ${change >= 0 ? 'text-green-600' : 'text-red-600'} flex items-center`}>
        {change >= 0 ? <ArrowUp size={16} className="mr-1" /> : <ArrowDown size={16} className="mr-1" />}
        {Math.abs(change)}% from previous month
      </p>
    )}
  </div>
);

const marketData = [
  { name: 'Jan', value: 4000 },
  { name: 'Feb', value: 3000 },
  { name: 'Mar', value: 5000 },
  { name: 'Apr', value: 4500 },
  { name: 'May', value: 6000 },
  { name: 'Jun', value: 5500 },
];

const topHoldings = [
  { symbol: 'AAPL', name: 'Apple Inc.', value: '$10,000', change: 2.5 },
  { symbol: 'MSFT', name: 'Microsoft Corporation', value: '$8,500', change: -1.2 },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', value: '$7,200', change: 1.8 },
  { symbol: 'AMZN', name: 'Amazon.com, Inc.', value: '$6,800', change: 0.5 },
];

const Dashboard = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <DashboardCard 
          title="Portfolio Value" 
          value="$125,000" 
          change={3.2} 
          icon={<DollarSign size={24} className="text-blue-500" />} 
        />
        <DashboardCard 
          title="Total Gain/Loss" 
          value="$12,500" 
          change={5.7} 
          icon={<TrendingUp size={24} className="text-green-500" />} 
        />
        <DashboardCard 
          title="Day's Change" 
          value="$1,250" 
          change={1.2} 
          icon={<Activity size={24} className="text-orange-500" />} 
        />
        <DashboardCard 
          title="Cash Balance" 
          value="$10,000" 
          icon={<DollarSign size={24} className="text-gray-500" />} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Market Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={marketData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Top Holdings</h2>
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-600">
                <th className="pb-2">Symbol</th>
                <th className="pb-2">Name</th>
                <th className="pb-2">Value</th>
                <th className="pb-2">Change</th>
              </tr>
            </thead>
            <tbody>
              {topHoldings.map((holding) => (
                <tr key={holding.symbol} className="border-t">
                  <td className="py-2 font-semibold">{holding.symbol}</td>
                  <td className="py-2">{holding.name}</td>
                  <td className="py-2">{holding.value}</td>
                  <td className={`py-2 ${holding.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {holding.change >= 0 ? '+' : ''}{holding.change}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;