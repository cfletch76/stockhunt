import React, { useState } from 'react';
import { ArrowUp, ArrowDown, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const MarketCard = ({ name, value, change, status, monthPerf, up, down }) => {
  const statusColor = status === 'UPTREND' ? 'bg-green-600' : status === 'DOWNTREND' ? 'bg-red-600' : 'bg-orange-500';
  const changeColor = change.startsWith('+') ? 'text-green-600' : 'text-red-600';

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className={`${statusColor} text-white text-xs font-bold uppercase py-1 px-2 rounded mb-2 inline-block`}>
        {status}
      </div>
      <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      <p className={`text-sm ${changeColor} flex items-center`}>
        {change.startsWith('+') ? <ArrowUp size={16} className="mr-1" /> : <ArrowDown size={16} className="mr-1" />}
        {change} (1M: {monthPerf})
      </p>
      <div className="flex justify-between text-xs mt-2">
        <span className="text-green-600">{up} ▲</span>
        <span className="text-red-600">{down} ▼</span>
      </div>
    </div>
  );
};

const StockGroupCard = ({ rank, name, oneMonth, threeMonths, ytd }) => (
  <div className="bg-white rounded-lg shadow p-4 flex items-start">
    <div className="mr-4 bg-blue-600 rounded-full w-8 h-8 flex items-center justify-center text-white font-bold">
      {rank}
    </div>
    <div className="flex-grow">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{name}</h3>
      <div className="grid grid-cols-3 gap-2 text-sm">
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
      <a href="#" className="text-blue-600 text-sm mt-2 inline-block">View Stocks →</a>
    </div>
  </div>
);

const MarketLeaderCard = ({ symbol, name, price, change, data }) => (
  <div className="bg-white rounded-lg shadow p-4">
    <div className="flex justify-between items-start mb-2">
      <div>
        <h3 className="text-lg font-semibold text-gray-800">{symbol}</h3>
        <p className="text-sm text-gray-600">{name}</p>
      </div>
      <div className="text-right">
        <p className="text-lg font-bold text-gray-900">${price}</p>
        <p className={`text-sm ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          {change >= 0 ? '+' : ''}{change}%
        </p>
      </div>
    </div>
    <ResponsiveContainer width="100%" height={100}>
      <LineChart data={data}>
        <Line type="monotone" dataKey="price" stroke="#8884d8" strokeWidth={2} dot={false} />
        <XAxis dataKey="date" hide={true} />
        <YAxis hide={true} />
        <Tooltip />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

const Dashboard = () => {
  const [leaderTimeframe, setLeaderTimeframe] = useState('6m');

  const markets = [
    { name: 'S&P 500', value: '4,250.32', change: '+0.75%', status: 'UPTREND', monthPerf: '+3.2%', up: 400, down: 100 },
    { name: 'NASDAQ', value: '14,120.45', change: '-0.22%', status: 'SIDEWAYS', monthPerf: '+1.8%', up: 1800, down: 1200 },
    { name: 'Dow Jones', value: '33,875.12', change: '+0.51%', status: 'UPTREND', monthPerf: '+2.5%', up: 22, down: 8 },
    { name: 'Russell 2000', value: '2,188.90', change: '+1.05%', status: 'DOWNTREND', monthPerf: '-0.7%', up: 1100, down: 900 },
  ];

  const stockGroups = [
    { rank: 1, name: 'Semiconductors', oneMonth: '+5.2%', threeMonths: '+12.8%', ytd: '+22.5%' },
    { rank: 2, name: 'Software', oneMonth: '+3.7%', threeMonths: '+9.5%', ytd: '+18.3%' },
    { rank: 3, name: 'Gold Miners', oneMonth: '-1.2%', threeMonths: '+4.3%', ytd: '+7.8%' },
    { rank: 4, name: 'Consumer Retail', oneMonth: '+2.1%', threeMonths: '+6.9%', ytd: '+11.2%' },
    { rank: 5, name: 'Biotech', oneMonth: '+4.5%', threeMonths: '+10.2%', ytd: '+15.7%' },
    { rank: 6, name: 'Cloud Computing', oneMonth: '+3.9%', threeMonths: '+8.7%', ytd: '+19.1%' },
    { rank: 7, name: 'Electric Vehicles', oneMonth: '+6.3%', threeMonths: '+14.5%', ytd: '+26.8%' },
    { rank: 8, name: 'Renewable Energy', oneMonth: '+2.8%', threeMonths: '+7.6%', ytd: '+13.9%' },
    { rank: 9, name: 'Cybersecurity', oneMonth: '+3.4%', threeMonths: '+9.1%', ytd: '+17.2%' },
    { rank: 10, name: 'Artificial Intelligence', oneMonth: '+5.7%', threeMonths: '+13.2%', ytd: '+24.3%' },
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
      { symbol: 'GOOGL', name: 'Alphabet Inc', price: 2750.50, change: 25.2, data: [
        { date: '2023-01', price: 2200 },
        { date: '2023-06', price: 2750 }
      ]}
    ],
    '3m': [
      { symbol: 'TSLA', name: 'Tesla Inc', price: 650.30, change: 22.8, data: [
        { date: '2023-04', price: 550 },
        { date: '2023-06', price: 650 }
      ]},
      { symbol: 'AMZN', name: 'Amazon.com Inc', price: 3300.15, change: 18.5, data: [
        { date: '2023-04', price: 2800 },
        { date: '2023-06', price: 3300 }
      ]},
      { symbol: 'FB', name: 'Meta Platforms', price: 330.80, change: 15.7, data: [
        { date: '2023-04', price: 280 },
        { date: '2023-06', price: 330 }
      ]},
      { symbol: 'NFLX', name: 'Netflix Inc', price: 510.80, change: 12.3, data: [
        { date: '2023-04', price: 450 },
        { date: '2023-06', price: 510 }
      ]}
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
      ]}
    ]
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Market Dashboard</h1>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Markets</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {markets.map((market) => (
            <MarketCard key={market.name} {...market} />
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Top Stock Groups</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {stockGroups.map((group) => (
            <StockGroupCard key={group.name} {...group} />
          ))}
        </div>
      </section>

      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-gray-800">Market Leaders</h2>
          <div className="flex space-x-2">
            {['1m', '3m', '6m'].map((timeframe) => (
              <button
                key={timeframe}
                onClick={() => setLeaderTimeframe(timeframe)}
                className={`px-3 py-1 rounded ${leaderTimeframe === timeframe ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
              >
                {timeframe}
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {marketLeaders[leaderTimeframe].map((leader) => (
            <MarketLeaderCard key={leader.symbol} {...leader} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;