import React, { useState } from 'react';
import { ArrowUp, ArrowDown, DollarSign, TrendingUp, Shield, Users, AlertTriangle, X } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const MetricCard = ({ title, value, change, icon, onClick }) => (
  <div className="bg-white rounded-lg shadow p-4 cursor-pointer" onClick={onClick}>
    <div className="flex justify-between items-center mb-2">
      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      {icon}
    </div>
    <p className="text-2xl font-bold text-gray-900">{value}</p>
    {change && (
      <p className={`text-sm ${change >= 0 ? 'text-green-600' : 'text-red-600'} flex items-center`}>
        {change >= 0 ? <ArrowUp size={16} className="mr-1" /> : <ArrowDown size={16} className="mr-1" />}
        {Math.abs(change)}% from previous year
      </p>
    )}
  </div>
);

const QuarterlyDataTable = ({ data, title, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-3xl w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">{title} - Quarterly Data</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <X size={24} />
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2">Quarter</th>
              <th className="p-2">Value</th>
              <th className="p-2">YoY Growth</th>
            </tr>
          </thead>
          <tbody>
            {data.map((quarter, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                <td className="p-2">{quarter.quarter}</td>
                <td className="p-2">{quarter.value}</td>
                <td className={`p-2 ${quarter.growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {quarter.growth >= 0 ? '+' : ''}{quarter.growth}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

const historicalData = [
  { year: '2018', revenue: 31.9, netIncome: 6.4, freeCashFlow: 5.6 },
  { year: '2019', revenue: 37.3, netIncome: 8.9, freeCashFlow: 6.8 },
  { year: '2020', revenue: 33.0, netIncome: 7.7, freeCashFlow: 8.7 },
  { year: '2021', revenue: 38.7, netIncome: 9.8, freeCashFlow: 11.3 },
  { year: '2022', revenue: 43.0, netIncome: 9.5, freeCashFlow: 9.5 },
];

const generateQuarterlyData = (metric) => {
  const currentYear = new Date().getFullYear();
  const currentQuarter = Math.floor((new Date().getMonth() + 3) / 3);
  const data = [];

  for (let i = -4; i < 8; i++) {
    const year = currentYear + Math.floor((currentQuarter + i - 1) / 4);
    const quarter = ((currentQuarter + i - 1) % 4 + 4) % 4 + 1;
    const isProjected = i >= 0;

    let value, growth;
    if (isProjected) {
      value = metric === 'revenue' ? (Math.random() * 5 + 10).toFixed(2) : (Math.random() * 0.5 + 0.5).toFixed(2);
      growth = (Math.random() * 30 - 10).toFixed(1);
    } else {
      value = metric === 'revenue' ? (Math.random() * 5 + 8).toFixed(2) : (Math.random() * 0.5 + 0.4).toFixed(2);
      growth = (Math.random() * 20 - 5).toFixed(1);
    }

    data.push({
      quarter: `Q${quarter} ${year}${isProjected ? ' (Projected)' : ''}`,
      value: metric === 'revenue' ? `$${value}B` : `$${value}`,
      growth: parseFloat(growth)
    });
  }

  return data;
};

const AnalysisView = () => {
  const [perspective, setPerspective] = useState('value');
  const [showQuarterlyData, setShowQuarterlyData] = useState(null);

  const valueMetrics = [
    { title: "Current Price", value: "$60.35", change: 2.5, icon: <DollarSign size={24} className="text-blue-500" /> },
    { title: "ROIC", value: "14.2%", change: 0.8, icon: <TrendingUp size={24} className="text-green-500" /> },
    { title: "Dividend Yield", value: "3.1%", change: 0.2, icon: <DollarSign size={24} className="text-green-500" /> },
    { title: "Moat Score", value: "95/100", icon: <Shield size={24} className="text-blue-500" /> },
  ];

  const growthMetrics = [
    { title: "Current Price", value: "$60.35", change: 2.5, icon: <DollarSign size={24} className="text-blue-500" /> },
    { 
      title: "Revenue Growth", 
      value: "12.5%", 
      change: 1.5, 
      icon: <TrendingUp size={24} className="text-green-500" />,
      onClick: () => setShowQuarterlyData('revenue')
    },
    { 
      title: "EPS Growth", 
      value: "15.2%", 
      change: 2.1, 
      icon: <TrendingUp size={24} className="text-green-500" />,
      onClick: () => setShowQuarterlyData('eps')
    },
    { title: "Relative Strength (3m)", value: "78/100", icon: <TrendingUp size={24} className="text-blue-500" /> },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Stock Analysis: KO (Coca-Cola)</h1>
        <div className="flex space-x-2">
          <button
            className={`px-4 py-2 rounded ${perspective === 'value' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            onClick={() => setPerspective('value')}
          >
            Value
          </button>
          <button
            className={`px-4 py-2 rounded ${perspective === 'growth' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            onClick={() => setPerspective('growth')}
          >
            Growth
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {(perspective === 'value' ? valueMetrics : growthMetrics).map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </div>

      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Financial Performance</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={historicalData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="revenue" stroke="#8884d8" name="Revenue" />
            <Line type="monotone" dataKey="netIncome" stroke="#82ca9d" name="Net Income" />
            <Line type="monotone" dataKey="freeCashFlow" stroke="#ffc658" name="Free Cash Flow" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {perspective === 'value' ? (
          <>
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Economic Moat Analysis</h2>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <Shield size={20} className="text-green-500 mr-2 mt-1" />
                  <span>Strong brand portfolio with 21 billion-dollar brands</span>
                </li>
                <li className="flex items-start">
                  <Shield size={20} className="text-green-500 mr-2 mt-1" />
                  <span>Extensive global distribution network</span>
                </li>
                <li className="flex items-start">
                  <Shield size={20} className="text-green-500 mr-2 mt-1" />
                  <span>Economies of scale in production and marketing</span>
                </li>
                <li className="flex items-start">
                  <Shield size={20} className="text-green-500 mr-2 mt-1" />
                  <span>High barriers to entry in the beverage industry</span>
                </li>
              </ul>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Management Quality</h2>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <Users size={20} className="text-blue-500 mr-2 mt-1" />
                  <span>Consistent dividend growth for 59 consecutive years</span>
                </li>
                <li className="flex items-start">
                  <Users size={20} className="text-blue-500 mr-2 mt-1" />
                  <span>Strong focus on ROIC improvement</span>
                </li>
                <li className="flex items-start">
                  <Users size={20} className="text-blue-500 mr-2 mt-1" />
                  <span>Effective capital allocation strategies</span>
                </li>
                <li className="flex items-start">
                  <Users size={20} className="text-blue-500 mr-2 mt-1" />
                  <span>Clear long-term growth strategy</span>
                </li>
              </ul>
            </div>
          </>
        ) : (
          <>
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Growth Drivers</h2>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <TrendingUp size={20} className="text-green-500 mr-2 mt-1" />
                  <span>Expansion into emerging markets</span>
                </li>
                <li className="flex items-start">
                  <TrendingUp size={20} className="text-green-500 mr-2 mt-1" />
                  <span>Innovation in healthier beverage options</span>
                </li>
                <li className="flex items-start">
                  <TrendingUp size={20} className="text-green-500 mr-2 mt-1" />
                  <span>Strategic acquisitions to diversify product portfolio</span>
                </li>
                <li className="flex items-start">
                  <TrendingUp size={20} className="text-green-500 mr-2 mt-1" />
                  <span>Digital transformation initiatives</span>
                </li>
              </ul>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Market Position</h2>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <Users size={20} className="text-blue-500 mr-2 mt-1" />
                  <span>Global leader in non-alcoholic beverages</span>
                </li>
                <li className="flex items-start">
                  <Users size={20} className="text-blue-500 mr-2 mt-1" />
                  <span>Strong market share in key regions</span>
                </li>
                <li className="flex items-start">
                  <Users size={20} className="text-blue-500 mr-2 mt-1" />
                  <span>Diversified product portfolio across multiple categories</span>
                </li>
                <li className="flex items-start">
                  <Users size={20} className="text-blue-500 mr-2 mt-1" />
                  <span>Continued focus on brand building and marketing</span>
                </li>
              </ul>
            </div>
          </>
        )}
      </div>

      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Risks and Considerations</h2>
        <ul className="space-y-2">
          <li className="flex items-start">
            <AlertTriangle size={20} className="text-yellow-500 mr-2 mt-1" />
            <span>Increasing health consciousness may impact sugary drink consumption</span>
          </li>
          <li className="flex items-start">
            <AlertTriangle size={20} className="text-yellow-500 mr-2 mt-1" />
            <span>Potential for increased regulations on sugary beverages</span>
          </li>
          <li className="flex items-start">
            <AlertTriangle size={20} className="text-yellow-500 mr-2 mt-1" />
            <span>Currency fluctuations due to global operations</span>
          </li>
          <li className="flex items-start">
            <AlertTriangle size={20} className="text-yellow-500 mr-2 mt-1" />
            <span>Commodity price volatility affecting input costs</span>
          </li>
        </ul>
      </div>

      <div className="bg-blue-100 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-blue-800 mb-4">
          {perspective === 'value' ? "Value Investor's Summary" : "Growth Investor's Summary"}
        </h2>
        <p className="text-gray-800 mb-4">
          {perspective === 'value' ? (
            "Coca-Cola exemplifies many qualities that value investors seek. Its strong economic moat, consistent financial performance, and shareholder-friendly management make it an attractive option. The company's high ROIC of 14.2% demonstrates efficient capital allocation, while its 3.1% dividend yield provides steady income."
          ) : (
            "Coca-Cola demonstrates solid growth potential with its strategic initiatives and market position. The company's focus on innovation, expansion into emerging markets, and digital transformation present opportunities for continued growth. With a revenue growth rate of 12.5% and EPS growth of 15.2%, Coca-Cola shows promise for growth-oriented investors."
          )}
        </p>
        <p className="text-gray-800">
          {perspective === 'value' ? (
            "However, investors should be aware of risks related to changing consumer preferences and potential regulatory challenges. Despite these concerns, Coca-Cola's strong fundamentals and proven ability to adapt to market changes make it a compelling consideration for a value-oriented portfolio."
          ) : (
            "While the company faces challenges such as shifting consumer preferences and regulatory risks, its strong brand portfolio and market leadership position it well for future growth. Investors should monitor the company's ability to innovate and adapt to changing market conditions."
          )}
        </p>
      </div>

      {showQuarterlyData && (
        <QuarterlyDataTable 
          data={generateQuarterlyData(showQuarterlyData)}
          title={showQuarterlyData === 'revenue' ? 'Revenue' : 'Earnings Per Share'}
          onClose={() => setShowQuarterlyData(null)}
        />
      )}
    </div>
  );
};

export default AnalysisView;