import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import ChatView from './components/ChatView';
import AnalysisView from './components/AnalysisView';
import PortfolioView from './components/PortfolioView';
import BulkView from './components/BulkView'; // Import the new BulkView component

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-green-300 via-blue-500 to-purple-600">
        <Header />
        <main className="max-w-7xl mx-auto p-4">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/chat" element={<ChatView />} />
            <Route path="/analysis" element={<AnalysisView />} />
            <Route path="/portfolio" element={<PortfolioView />} />
            <Route path="/bulk" element={<BulkView />} /> {/* Add the new route for BulkView */}
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;