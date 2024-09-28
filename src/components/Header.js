import React from 'react';
import { Link } from 'react-router-dom';
import { Home, MessageCircle, BarChart2, DollarSign } from 'lucide-react';
// import { Database } from 'lucide-react';  // Commented out unused import

const Header = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <img src="/stockhunt.png" alt="StockHunt Logo" className="h-10 w-auto mr-4" />
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link to="/" className="flex items-center text-gray-700 hover:text-blue-600">
                <Home size={20} className="mr-1" />
                <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link to="/chat" className="flex items-center text-gray-700 hover:text-blue-600">
                <MessageCircle size={20} className="mr-1" />
                <span>Chat</span>
              </Link>
            </li>
            <li>
              <Link to="/analysis" className="flex items-center text-gray-700 hover:text-blue-600">
                <BarChart2 size={20} className="mr-1" />
                <span>Analysis</span>
              </Link>
            </li>
            <li>
              <Link to="/portfolio" className="flex items-center text-gray-700 hover:text-blue-600">
                <DollarSign size={20} className="mr-1" />
                <span>Portfolio</span>
              </Link>
            </li>
            {/* commenting out IndustryView Link
            <li>
              <Link to="/industry" className="flex items-center text-gray-700 hover:text-blue-600">
                <Database size={20} className="mr-1" />
                <span>Industry View</span>
              </Link>
            </li>
            j*/}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;