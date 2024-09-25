import React, { useState, useEffect, useCallback } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowUp, ArrowDown, DollarSign, TrendingUp, Shield, Users, AlertTriangle } from 'lucide-react';

const MetricCard = ({ title, value, change, icon }) => (
  <div className="bg-white bg-opacity-90 rounded-lg shadow p-4">
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

const QuarterlyDataTable = ({ data, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
    <div className="bg-white rounded-lg shadow-xl p-6 max-w-4xl w-full max-h-full overflow-auto">
      <h2 className="text-2xl font-bold mb-4">Quarterly Data</h2>
      <table className="w-full mb-4">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 text-left">Quarter</th>
            <th className="p-2 text-left">Value</th>
            <th className="p-2 text-left">YoY Growth</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
              <td className="p-2">{item.quarter}</td>
              <td className="p-2">{item.value}</td>
              <td className={`p-2 ${item.growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {item.growth}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        onClick={onClose}
      >
        Close
      </button>
    </div>
  </div>
);

const generateQuarterlyData = (type) => {
  const currentYear = new Date().getFullYear();
  const currentQuarter = Math.floor((new Date().getMonth() + 3) / 3);
  const data = [];

  for (let i = 4; i >= -8; i--) {
    const quarter = ((currentQuarter - i - 1) % 4) + 1;
    const year = currentYear + Math.floor((currentQuarter - i - 1) / 4);
    const value = type === 'revenue'
      ? (Math.random() * 10 + 20).toFixed(2)
      : (Math.random() * 2 + 1).toFixed(2);
    const growth = (Math.random() * 40 - 20).toFixed(1);

    data.push({
      quarter: `Q${quarter} ${year}`,
      value: type === 'revenue' ? `$${value}B` : `$${value}`,
      growth: growth
    });
  }

  return data;
};

const AnalysisView = () => {
  const [perspective, setPerspective] = useState('value');
  const [searchTerm, setSearchTerm] = useState('NVDA');
  const [stockData, setStockData] = useState(null);
  const [showQuarterlyData, setShowQuarterlyData] = useState(false);
  const [quarterlyDataType, setQuarterlyDataType] = useState('');

  const fetchStockData = useCallback(async (symbol) => {
    // Simulating API call
    console.log(`Fetching data for ${symbol}`);
    // In a real app, you would make an API call here
    setStockData({
      symbol: symbol,
      name: symbol === 'NVDA' ? 'NVIDIA Corporation' : 'Sample Company',
      price: 280.75,
      change: 2.5,
      roic: 14.2,
      revenueGrowth: 25.5,
      epsGrowth: 30.2,
      relativeStrength: 85,
    });
  }, []);

  const handleSearch = useCallback(async (e) => {
    if (e) e.preventDefault();
    await fetchStockData(searchTerm);
  }, [searchTerm, fetchStockData]);

  useEffect(() => {
    handleSearch();
  }, [handleSearch]);

  const historicalData = [
    { year: '2018', revenue: 31.9, netIncome: 6.4, freeCashFlow: 5.6 },
    { year: '2019', revenue: 37.3, netIncome: 8.9, freeCashFlow: 6.8 },
    { year: '2020', revenue: 33.0, netIncome: 7.7, freeCashFlow: 8.7 },
    { year: '2021', revenue: 38.7, netIncome: 9.8, freeCashFlow: 11.3 },
    { year: '2022', revenue: 43.0, netIncome: 9.5, freeCashFlow: 9.5 },
  ];

  const handleQuarterlyDataClick = (type) => {
    setQuarterlyDataType(type);
    setShowQuarterlyData(true);
  };

  const valueMetrics = [
    { title: 'Current Price', value: `$${stockData?.price}`, change: stockData?.change, icon: <DollarSign size={24} className="text-blue-500" /> },
    { title: 'ROIC', value: `${stockData?.roic}%`, change: 0.8, icon: <TrendingUp size={24} className="text-green-500" /> },
    { title: 'Revenue Growth', value: `${stockData?.revenueGrowth}%`, change: null, icon: <TrendingUp size={24} className="text-green-500" /> },
    { title: 'Relative Strength', value: `${stockData?.relativeStrength}/100`, icon: <TrendingUp size={24} className="text-blue-500" /> },
  ];

  const growthMetrics = [
    { title: 'Current Price', value: `$${stockData?.price}`, change: stockData?.change, icon: <DollarSign size={24} className="text-blue-500" /> },
    { title: 'Revenue Growth', value: `${stockData?.revenueGrowth}%`, change: null, icon: <TrendingUp size={24} className="text-green-500" /> },
    { title: 'EPS Growth', value: `${stockData?.epsGrowth}%`, change: null, icon: <TrendingUp size={24} className="text-green-500" /> },
    { title: 'Relative Strength', value: `${stockData?.relativeStrength}/100`, icon: <TrendingUp size={24} className="text-blue-500" /> },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-300 via-blue-500 to-purple-600 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white bg-opacity-90 rounded-lg shadow-md p-4 mb-6">
          <form onSubmit={handleSearch} className="flex items-center">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Enter stock symbol..."
              className="flex-grow p-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Search
            </button>
          </form>
        </div>

        {stockData ? (
          <>
            <h1 className="text-3xl font-bold text-white mb-6">{stockData.name} ({stockData.symbol}) Analysis</h1>
            
            <div className="mb-6">
              <div className="flex space-x-4 mb-4">
                <button
                  onClick={() => setPerspective('value')}
                  className={`px-4 py-2 rounded ${perspective === 'value' ? 'bg-blue-600 text-white' : 'bg-white text-blue-600'}`}
                >
                  Value Perspective
                </button>
                <button
                  onClick={() => setPerspective('growth')}
                  className={`px-4 py-2 rounded ${perspective === 'growth' ? 'bg-blue-600 text-white' : 'bg-white text-blue-600'}`}
                >
                  Growth Perspective
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {(perspective === 'value' ? valueMetrics : growthMetrics).map((metric, index) => (
                  <div key={index} onClick={() => ['Revenue Growth', 'EPS Growth'].includes(metric.title) ? handleQuarterlyDataClick(metric.title.toLowerCase().split(' ')[0]) : null}>
                    <MetricCard {...metric} />
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white bg-opacity-90 rounded-lg shadow p-6 mb-8">
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
              <div className="bg-white bg-opacity-90 rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  {perspective === 'value' ? 'Economic Moat Analysis' : 'Growth Drivers'}
                </h2>
                <ul className="space-y-2">
                  {perspective === 'value' ? (
                    <>
                      <li className="flex items-start">
                        <Shield size={20} className="text-green-500 mr-2 mt-1" />
                        <span>Strong brand portfolio with industry-leading products</span>
                      </li>
                      <li className="flex items-start">
                        <Shield size={20} className="text-green-500 mr-2 mt-1" />
                        <span>High switching costs for customers</span>
                      </li>
                      <li className="flex items-start">
                        <Shield size={20} className="text-green-500 mr-2 mt-1" />
                        <span>Significant intellectual property and patents</span>
                      </li>
                      <li className="flex items-start">
                        <Shield size={20} className="text-green-500 mr-2 mt-1" />
                        <span>Network effects in certain product ecosystems</span>
                      </li>
                    </>
                  ) : (
                    <>
                      <li className="flex items-start">
                        <TrendingUp size={20} className="text-blue-500 mr-2 mt-1" />
                        <span>Expansion into new markets and geographies</span>
                      </li>
                      <li className="flex items-start">
                        <TrendingUp size={20} className="text-blue-500 mr-2 mt-1" />
                        <span>Innovation in AI and machine learning technologies</span>
                      </li>
                      <li className="flex items-start">
                        <TrendingUp size={20} className="text-blue-500 mr-2 mt-1" />
                        <span>Strategic acquisitions to enhance product offerings</span>
                      </li>
                      <li className="flex items-start">
                        <TrendingUp size={20} className="text-blue-500 mr-2 mt-1" />
                        <span>Growing demand in data center and cloud computing sectors</span>
                      </li>
                    </>
                  )}
                </ul>
              </div>
              
              <div className="bg-white bg-opacity-90 rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  {perspective === 'value' ? 'Management Quality' : 'Market Position'}
                </h2>
                <ul className="space-y-2">
                  {perspective === 'value' ? (
                    <>
                      <li className="flex items-start">
                        <Users size={20} className="text-blue-500 mr-2 mt-1" />
                        <span>Experienced leadership team with industry expertise</span>
                      </li>
                      <li className="flex items-start">
                        <Users size={20} className="text-blue-500 mr-2 mt-1" />
                        <span>Strong focus on R&D and innovation</span>
                      </li>
                      <li className="flex items-start">
                        <Users size={20} className="text-blue-500 mr-2 mt-1" />
                        <span>Effective capital allocation strategies</span>
                      </li>
                      <li className="flex items-start">
                        <Users size={20} className="text-blue-500 mr-2 mt-1" />
                        <span>Clear long-term growth strategy</span>
                      </li>
                    </>
                  ) : (
                    <>
                      <li className="flex items-start">
                        <Users size={20} className="text-blue-500 mr-2 mt-1" />
                        <span>Market leader in GPU and AI chip technologies</span>
                      </li>
                      <li className="flex items-start">
                        <Users size={20} className="text-blue-500 mr-2 mt-1" />
                        <span>Strong presence in gaming and professional visualization markets</span>
                      </li>
                      <li className="flex items-start">
                        <Users size={20} className="text-blue-500 mr-2 mt-1" />
                        <span>Growing market share in data center solutions</span>
                      </li>
                      <li className="flex items-start">
                        <Users size={20} className="text-blue-500 mr-2 mt-1" />
                        <span>Partnerships with major tech companies and research institutions</span>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>

            <div className="bg-white bg-opacity-90 rounded-lg shadow p-6 mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Risks and Considerations</h2>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <AlertTriangle size={20} className="text-yellow-500 mr-2 mt-1" />
                  <span>Intense competition in the semiconductor industry</span>
                </li>
                <li className="flex items-start">
                  <AlertTriangle size={20} className="text-yellow-500 mr-2 mt-1" />
                  <span>Potential for technology disruption or obsolescence</span>
                </li>
                <li className="flex items-start">
                  <AlertTriangle size={20} className="text-yellow-500 mr-2 mt-1" />
                  <span>Dependency on global supply chains and potential disruptions</span>
                </li>
                <li className="flex items-start">
                  <AlertTriangle size={20} className="text-yellow-500 mr-2 mt-1" />
                  <span>Regulatory challenges and geopolitical risks</span>
                </li>
              </ul>
            </div>

            <div className="bg-blue-100 bg-opacity-90 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-blue-800 mb-4">
                {perspective === 'value' ? "Value Investor's Summary" : "Growth Investor's Summary"}
              </h2>
              <p className="text-gray-800 mb-4">
                {perspective === 'value' 
                  ? `${stockData.name} demonstrates strong characteristics that align with value investing principles. Its robust economic moat, driven by brand strength, technological leadership, and high switching costs, provides a sustainable competitive advantage. The company's solid ROIC of ${stockData.roic}% indicates efficient capital allocation and value creation for shareholders.`
                  : `${stockData.name} shows compelling growth prospects, with a strong market position in rapidly expanding sectors such as AI, data centers, and gaming. The company's impressive revenue growth of ${stockData.revenueGrowth}% and EPS growth of ${stockData.epsGrowth}% reflect its ability to capitalize on these opportunities.`
                }
              </p>
              <p className="text-gray-800 mb-4">
                {perspective === 'value'
                  ? "The management team's focus on R&D and strategic capital allocation supports long-term value creation. However, investors should be mindful of the competitive landscape and potential technological disruptions."
                  : "The company's continued investment in R&D and strategic expansions position it well for future growth. However, investors should consider the high expectations built into the stock price and potential risks from intense competition and market volatility."
                }
              </p>
              <p className="text-gray-800">
                {perspective === 'value'
                  ? "Overall, while the stock may not be undervalued in the traditional sense, its strong fundamentals and competitive position make it a quality consideration for value-oriented portfolios with a long-term investment horizon."
                  : "For growth investors, the stock presents an attractive opportunity, given its strong market position and exposure to high-growth sectors. However, as with any high-growth stock, it's crucial to monitor the company's ability to maintain its growth trajectory and adapt to changing market conditions."
                }
              </p>
            </div>
          </>
        ) : (
          <div className="text-center text-white">
            <p className="text-2xl">Enter a stock symbol to view analysis</p>
          </div>
        )}
      </div>

      {showQuarterlyData && (
        <QuarterlyDataTable
          data={generateQuarterlyData(quarterlyDataType)}
          onClose={() => setShowQuarterlyData(false)}
        />
      )}
    </div>
  );
};

export default AnalysisView;