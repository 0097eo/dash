import React, { useState } from 'react';
import { Save, Bell, Moon, Globe, Shield, Lock, Users, Settings as SettingsIcon, Database } from 'lucide-react';

const Settings = () => {
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
    language: 'en',
    twoFactorAuth: false,
    newsletter: true,
    dataSharing: false,
    maintenanceMode: false,
    logLevel: 'info',
    backupFrequency: 'daily',
  });

  const [userManagement, setUserManagement] = useState({
    maxUsers: 1000,
    userApproval: false,
    passwordPolicy: 'medium',
  });

  const handleSettingChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prevSettings => ({
      ...prevSettings,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleUserManagementChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUserManagement(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Admin settings saved:', settings);
    console.log('User management settings saved:', userManagement);
    alert('Admin settings saved successfully!');
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6">Settings</h2>
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* User Management Section */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <Users className="mr-2" /> User Management
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-2">Max Users</label>
              <input
                type="number"
                name="maxUsers"
                value={userManagement.maxUsers}
                onChange={handleUserManagementChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block mb-2">User Approval</label>
              <input
                type="checkbox"
                name="userApproval"
                checked={userManagement.userApproval}
                onChange={handleUserManagementChange}
                className="mr-2"
              />
              Require admin approval for new users
            </div>
            <div>
              <label className="block mb-2">Password Policy</label>
              <select
                name="passwordPolicy"
                value={userManagement.passwordPolicy}
                onChange={handleUserManagementChange}
                className="w-full p-2 border rounded"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>
        </div>

        {/* System Settings */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <SettingsIcon className="mr-2" /> System Settings
          </h3>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="maintenanceMode"
                checked={settings.maintenanceMode}
                onChange={handleSettingChange}
                className="mr-2"
              />
              Maintenance Mode
            </label>
            <div>
              <label className="block mb-2">Log Level</label>
              <select
                name="logLevel"
                value={settings.logLevel}
                onChange={handleSettingChange}
                className="w-full p-2 border rounded"
              >
                <option value="error">Error</option>
                <option value="warn">Warn</option>
                <option value="info">Info</option>
                <option value="debug">Debug</option>
              </select>
            </div>
          </div>
        </div>

        {/* Database Settings */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <Database className="mr-2" /> Database Settings
          </h3>
          <div>
            <label className="block mb-2">Backup Frequency</label>
            <select
              name="backupFrequency"
              value={settings.backupFrequency}
              onChange={handleSettingChange}
              className="w-full p-2 border rounded"
            >
              <option value="hourly">Hourly</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
            </select>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <Bell className="mr-2" /> Notifications
          </h3>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="notifications"
                checked={settings.notifications}
                onChange={handleSettingChange}
                className="mr-2"
              />
              Enable System Notifications
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="newsletter"
                checked={settings.newsletter}
                onChange={handleSettingChange}
                className="mr-2"
              />
              Send Admin Newsletter
            </label>
          </div>
        </div>

        {/* Appearance Settings */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <Moon className="mr-2" /> Appearance
          </h3>
          <label className="flex items-center">
            <input
              type="checkbox"
              name="darkMode"
              checked={settings.darkMode}
              onChange={handleSettingChange}
              className="mr-2"
            />
            Dark Mode
          </label>
        </div>

        {/* Language Settings */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <Globe className="mr-2" /> Language
          </h3>
          <select
            name="language"
            value={settings.language}
            onChange={handleSettingChange}
            className="w-full p-2 border rounded"
          >
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="de">German</option>
            <option value="zh">Chinese</option>
          </select>
        </div>

        {/* Security Settings */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <Shield className="mr-2" /> Security
          </h3>
          <label className="flex items-center">
            <input
              type="checkbox"
              name="twoFactorAuth"
              checked={settings.twoFactorAuth}
              onChange={handleSettingChange}
              className="mr-2"
            />
            Enforce Two-Factor Authentication for All Users
          </label>
        </div>

        {/* Privacy Settings */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <Lock className="mr-2" /> Privacy
          </h3>
          <label className="flex items-center">
            <input
              type="checkbox"
              name="dataSharing"
              checked={settings.dataSharing}
              onChange={handleSettingChange}
              className="mr-2"
            />
            Allow Data Sharing with Third Parties
          </label>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button 
            type="submit" 
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center"
          >
            <Save className="mr-2" /> Save Settings
          </button>
        </div>
      </form>
    </div>
  );
};

export default Settings;