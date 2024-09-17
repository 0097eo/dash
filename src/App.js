import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import { Menu, TrendingUp, Settings, X, User} from 'lucide-react';
import Dashboard from './components/Dashboard';
import Reports from './components/Reports';
import SettingsPage from './components/Settings';

const App = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const NavItem = ({ to, icon: Icon, children }) => (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) =>
          `flex items-center space-x-2 p-2 rounded ${
            isActive ? 'bg-gray-700' : 'hover:bg-gray-700'
          }`
        }
        onClick={() => setIsMobileMenuOpen(false)}
      >
        <Icon size={20} />
        <span>{children}</span>
      </NavLink>
    </li>
  );

  return (
    <Router>
      <div className="flex flex-col h-screen bg-gray-100 md:flex-row">
        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden fixed top-4 left-4 z-20 p-2 bg-gray-800 text-white rounded"
          onClick={toggleMobileMenu}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Sidebar */}
        <aside
          className={`${
            isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          } md:translate-x-0 transition-transform duration-300 ease-in-out fixed md:static inset-y-0 left-0 z-10 w-64 bg-gray-800 text-white p-6 overflow-y-auto`}
        >
          <div className="flex items-center space-x-2 mb-8">
              <User size={32} />
              <h1 className="text-2xl font-bold">Emmanuel</h1>
          </div>
          <nav>
            <ul className="space-y-2">
              <NavItem to="/" icon={Menu}>Dashboard</NavItem>
              <NavItem to="/reports" icon={TrendingUp}>Reports</NavItem>
              <NavItem to="/settings" icon={Settings}>Settings</NavItem>
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-8 overflow-y-auto pt-16 md:pt-0">
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