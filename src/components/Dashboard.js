import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { ArrowUp, ArrowDown, ArrowRight } from 'lucide-react';

const MarketCard = ({ name, value, change, status, monthPerf, up, down }) => {
  const isPositive = change.startsWith('+');
  const statusColor = status === 'Uptrend' ? 'bg-green-600' : status === 'Downtrend' ? 'bg-red-600' : 'bg-orange-500';
  
  return (
    <div className="bg-white bg-opacity-90 rounded-lg shadow p-4">
      <div className={`${statusColor} text-white text-xs font-bold uppercase py-1 px-2 rounded mb-2 inline-block`}>{status}</div>
      <h3 className="text-sm font-semibold text-gray-800 mb-1">{name}</h3>
      <p className="text-lg font-bold text-gray-900 mb-1">{value}</p>
      <p className={`text-xs ${isPositive ? 'text-green-600' : 'text-red-600'} flex items-center mb-1`}>
        {isPositive ? <ArrowUp size={12} className="mr-1" /> : <ArrowDown size={12} className="mr-1" />}
        {change} (1M: {monthPerf})
      </p>
      <div className="flex justify-between text-xs">
        <span className="text-green-600">{up} ▲</span>
        <span className="text-red-600">{down} ▼</span>
      </div>
    </div>
  );
};

const GroupCard = ({ name, '1m': oneMonth, '3m': threeMonths, ytd, rank }) => {
  return (
    <div className="bg-opacity-99 bg-white p-3 rounded-lg shadow cursor-pointer hover:bg-blue-200 transition-colors flex">
      <div className="mr-3 flex items-center justify-center w-8 h-8 bg-blue-600 rounded-full text-white font-bold text-sm">
        #{rank}
      </div>
      <div className="flex-grow">
        <h3 className="text-sm font-semibold text-gray-800 mb-1">{name}</h3>
        <div className="grid grid-cols-3 gap-2 text-xs">
          <div>
            <span className="text-gray-600">1M:</span>
            <span className="font-medium ml-1">{oneMonth}</span>
          </div>
          <div>
            <span className="text-gray-600">3M:</span>
            <span className="font-medium ml-1">{threeMonths}</span>
          </div>
          <div>
            <span className="text-gray-600">YTD:</span>
            <span className="font-medium ml-1">{ytd}</span>
          </div>
        </div>
        <div className="mt-1 text-blue-600 flex items-center text-xs">
          <span>View Stocks</span>
          <ArrowRight size={12} className="ml-1" />
        </div>
      </div>
    </div>
  );
};
const LeaderCard = ({ symbol, name, price, change, data }) => {
  return (
    <div className="bg-opacity-99 bg-white p-3 rounded-lg shadow">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="text-sm font-semibold text-gray-800">{symbol}</h3>
          <p className="text-xs text-gray-600">{name}</p>
        </div>
        <div className="text-right">
          <p className="text-sm font-bold text-gray-900">${price}</p>
          <p className="text-xs text-green-600">{change}%</p>
        </div>
      </div>
      <div className="h-24">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="date" tick={{fontSize: 10}} />
            <YAxis domain={['dataMin', 'dataMax']} tick={{fontSize: 10}} />
            <Line type="monotone" dataKey="price" stroke="#4f46e5" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const [leaderDuration, setLeaderDuration] = useState('6m');

  const markets = [
    { name: 'S&P 500', value: '4,250.32', change: '+0.75%', status: 'Uptrend', monthPerf: '+3.2%', up: 400, down: 100 },
    { name: 'NASDAQ', value: '14,120.45', change: '-0.22%', status: 'Sideways', monthPerf: '+1.8%', up: 1800, down: 1200 },
    { name: 'Dow Jones', value: '33,875.12', change: '+0.51%', status: 'Uptrend', monthPerf: '+2.5%', up: 22, down: 8 },
    { name: 'Russell 2000', value: '2,188.90', change: '+1.05%', status: 'Downtrend', monthPerf: '-0.7%', up: 1100, down: 900 }
  ];

  const groups = [
    { name: 'Semiconductors', '1m': '+5.2%', '3m': '+12.8%', 'ytd': '+22.5%' },
    { name: 'Software', '1m': '+3.7%', '3m': '+9.5%', 'ytd': '+18.3%' },
    { name: 'Gold Miners', '1m': '-1.2%', '3m': '+4.3%', 'ytd': '+7.8%' },
    { name: 'Consumer Retail', '1m': '+2.1%', '3m': '+6.9%', 'ytd': '+11.2%' },
    { name: 'Biotech', '1m': '+4.5%', '3m': '+10.2%', 'ytd': '+15.7%' },
    { name: 'Cloud Computing', '1m': '+3.9%', '3m': '+8.7%', 'ytd': '+19.1%' },
    { name: 'Electric Vehicles', '1m': '+6.3%', '3m': '+14.5%', 'ytd': '+26.8%' },
    { name: 'Renewable Energy', '1m': '+2.8%', '3m': '+7.6%', 'ytd': '+13.9%' },
    { name: 'Cybersecurity', '1m': '+3.4%', '3m': '+9.1%', 'ytd': '+17.2%' },
    { name: 'Artificial Intelligence', '1m': '+5.7%', '3m': '+13.2%', 'ytd': '+24.3%' }
  ];

  const marketLeaders = {
    '6m': [
      { symbol: 'NVDA', name: 'NVIDIA Corp', price: 280.75, change: 145.3, data: [
        { date: '2023-01', price: 150 },
        { date: '2023-06', price: 280 }
      ]},
      { symbol: 'AAPL', name: 'Apple Inc', price: 150.25, change: 32.7, data: [
        { date: '2023-01', price: 120 },
        { date: '2023-06', price: 150 }
      ]},
      { symbol: 'MSFT', name: 'Microsoft Corp', price: 305.50, change: 28.5, data: [
        { date: '2023-01', price: 240 },
        { date: '2023-06', price: 305 }
      ]},
      { symbol: 'GOOGL', name: 'Alphabet Inc', price: 125.75, change: 25.2, data: [
        { date: '2023-01', price: 100 },
        { date: '2023-06', price: 125 }
      ]},
    ],
    '3m': [
      { symbol: 'TSLA', name: 'Tesla Inc', price: 650.30, change: 22.8, data: [
        { date: '2023-04', price: 550 },
        { date: '2023-06', price: 650 }
      ]},
      { symbol: 'AMZN', name: 'Amazon.com Inc', price: 130.15, change: 18.5, data: [
        { date: '2023-04', price: 110 },
        { date: '2023-06', price: 130 }
      ]},
      { symbol: 'META', name: 'Meta Platforms', price: 285.40, change: 15.7, data: [
        { date: '2023-04', price: 250 },
        { date: '2023-06', price: 285 }
      ]},
      { symbol: 'NFLX', name: 'Netflix Inc', price: 420.80, change: 12.3, data: [
        { date: '2023-04', price: 380 },
        { date: '2023-06', price: 420 }
      ]},
    ],
    '1m': [
      { symbol: 'AMD', name: 'Advanced Micro Devices', price: 95.20, change: 10.5, data: [
        { date: '2023-06-01', price: 85 },
        { date: '2023-06-30', price: 95 }
      ]},
      { symbol: 'CRM', name: 'Salesforce', price: 220.40, change: 8.7, data: [
        { date: '2023-06-01', price: 200 },
        { date: '2023-06-30', price: 220 }
      ]},
      { symbol: 'ADBE', name: 'Adobe Inc', price: 485.60, change: 7.2, data: [
        { date: '2023-06-01', price: 450 },
        { date: '2023-06-30', price: 485 }
      ]},
      { symbol: 'PYPL', name: 'PayPal Holdings', price: 72.30, change: 6.8, data: [
        { date: '2023-06-01', price: 67 },
        { date: '2023-06-30', price: 72 }
      ]},
    ],
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Market Overview</h1>
      
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Markets</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {markets.map((market) => (
            <MarketCard key={market.name} {...market} />
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Top Stock Groups</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {groups.map((group, index) => (
            <GroupCard key={group.name} {...group} rank={index + 1} />
          ))}
        </div>
      </section>

      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Market Leaders</h2>
          <div className="flex space-x-2">
            {['1m', '3m', '6m'].map((duration) => (
              <button
                key={duration}
                onClick={() => setLeaderDuration(duration)}
                className={`px-3 py-1 rounded ${leaderDuration === duration ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
              >
                {duration}
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {marketLeaders[leaderDuration].map((stock) => (
            <LeaderCard key={stock.symbol} {...stock} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;