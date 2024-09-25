import React, { useState } from 'react';
import { Send } from 'lucide-react';

const ChatMessage = ({ sender, content, timestamp }) => (
  <div className={`mb-4 ${sender === 'AI' ? 'mr-0' : 'ml-0'}`}>
    <div className={`p-4 rounded-lg ${sender === 'AI' ? 'bg-blue-100' : 'bg-green-100'}`}>
      <p className={`font-semibold ${sender === 'AI' ? 'text-blue-800' : 'text-green-800'}`}>{sender}</p>
      <p className="text-gray-800 mt-1">{content}</p>
      <p className="text-xs text-gray-500 mt-2">{timestamp}</p>
    </div>
  </div>
);

const StockOpportunityTable = ({ stocks }) => (
  <div className="bg-white bg-opacity-90 rounded-lg shadow-md overflow-x-auto mb-4">
    <table className="w-full">
      <thead className="bg-blue-100">
        <tr>
          <th className="p-3 text-left">Ticker</th>
          <th className="p-3 text-left">Earnings Growth</th>
          <th className="p-3 text-left">Sector Performance</th>
          <th className="p-3 text-left">Analyst Ratings</th>
          <th className="p-3 text-left">Action</th>
        </tr>
      </thead>
      <tbody>
        {stocks.map((stock) => (
          <tr key={stock.ticker} className="border-b">
            <td className="p-3 font-semibold">{stock.ticker}</td>
            <td className="p-3">{stock.earningsGrowth}/100</td>
            <td className="p-3">{stock.sectorPerformance}/100</td>
            <td className="p-3">{stock.analystRatings}/100</td>
            <td className="p-3">
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm">
                Analyze
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const ChatView = () => {
  const [inputMessage, setInputMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    {
      sender: 'You',
      content: 'What are some stocks that are good investment opportunities right now?',
      timestamp: '10:30 AM'
    },
    {
      sender: 'AI',
      content: "Based on our analysis, here are some stocks that present good investment opportunities right now. These stocks have been selected based on three key factors: 1. Strong earnings growth: Consistent increase in company profits. 2. Positive sector performance: They belong to industries that are currently thriving. 3. Favorable analyst ratings: Financial experts have a positive outlook on these stocks. Here's a table of potential stocks with scores for each category:",
      timestamp: '10:31 AM'
    }
  ]);

  const stockOpportunities = [
    { ticker: 'NVDA', earningsGrowth: 92, sectorPerformance: 88, analystRatings: 95 },
    { ticker: 'MSFT', earningsGrowth: 85, sectorPerformance: 88, analystRatings: 90 },
    { ticker: 'ASML', earningsGrowth: 78, sectorPerformance: 88, analystRatings: 88 },
    { ticker: 'AVGO', earningsGrowth: 88, sectorPerformance: 88, analystRatings: 92 },
    { ticker: 'AMD', earningsGrowth: 80, sectorPerformance: 88, analystRatings: 85 },
  ];

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      const newMessage = {
        sender: 'You',
        content: inputMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatHistory([...chatHistory, newMessage]);
      setInputMessage('');
      // Here you would typically send the message to your AI backend and wait for a response
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-green-300 via-blue-500 to-purple-600">
      <div className="flex-grow overflow-y-auto p-4 pb-24">
        <div className="max-w-4xl mx-auto space-y-4">
          {chatHistory.map((message, index) => (
            <ChatMessage key={index} {...message} />
          ))}
          {chatHistory.length === 2 && (
            <>
              <StockOpportunityTable stocks={stockOpportunities} />
              <ChatMessage
                sender="AI"
                content="These stocks show promise, but remember to conduct your own research and consider your investment goals and risk tolerance. Would you like me to provide a detailed analysis of any of these stocks?"
                timestamp="10:32 AM"
              />
            </>
          )}
        </div>
      </div>
      <div className="p-4 bg-white bg-opacity-90 border-t fixed bottom-0 left-0 right-0">
        <div className="max-w-4xl mx-auto flex items-center">
          <input
            type="text"
            className="flex-grow p-3 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Type your message..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <button
            className="bg-blue-500 text-white p-3 rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={handleSendMessage}
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatView;