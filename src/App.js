import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import ChatView from './components/ChatView';
import AnalysisView from './components/AnalysisView';
import PortfolioView from './components/PortfolioView';

function App() {
  return (
    <Router>
      <div className="flex flex-col h-screen bg-gradient-to-br from-green-300 via-blue-500 to-purple-600">
        <Header />
        <main className="flex-grow overflow-y-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/chat" element={<ChatView />} />
            <Route path="/analysis" element={<AnalysisView />} />
            <Route path="/portfolio" element={<PortfolioView />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;