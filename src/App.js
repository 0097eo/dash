import React from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import { Menu, TrendingUp, Settings } from 'lucide-react';
import Dashboard from './components/Dashboard';
import Reports from './components/Reports';
import SettingsPage from './components/Settings';

const App = () => {
  return (
    <Router>
      <div className="flex h-screen bg-gray-100">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-800 text-white p-6">
          <h1 className="text-2xl font-bold mb-8">Dashboard</h1>
          <nav>
            <ul className="space-y-2">
              <li>
                <NavLink to="/" className={({ isActive }) => 
                  `flex items-center space-x-2 p-2 rounded ${isActive ? 'bg-gray-700' : 'hover:bg-gray-700'}`
                }>
                  <Menu size={20} />
                  <span>Dashboard</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/reports" className={({ isActive }) => 
                  `flex items-center space-x-2 p-2 rounded ${isActive ? 'bg-gray-700' : 'hover:bg-gray-700'}`
                }>
                  <TrendingUp size={20} />
                  <span>Reports</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/settings" className={({ isActive }) => 
                  `flex items-center space-x-2 p-2 rounded ${isActive ? 'bg-gray-700' : 'hover:bg-gray-700'}`
                }>
                  <Settings size={20} />
                  <span>Settings</span>
                </NavLink>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;