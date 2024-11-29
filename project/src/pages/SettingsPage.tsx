import React from 'react';
import { Settings, Bell, Shield, Lock } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Settings</h2>

      <div className="bg-white rounded-lg shadow divide-y divide-gray-200">
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Bell className="w-6 h-6 text-gray-400" />
              <div className="ml-3">
                <h3 className="text-lg font-medium text-gray-900">Notifications</h3>
                <p className="text-sm text-gray-500">Manage your notification preferences</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
              </label>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Shield className="w-6 h-6 text-gray-400" />
              <div className="ml-3">
                <h3 className="text-lg font-medium text-gray-900">Security</h3>
                <p className="text-sm text-gray-500">Configure security settings</p>
              </div>
            </div>
            <button className="text-indigo-600 hover:text-indigo-900 text-sm font-medium">
              Configure
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Lock className="w-6 h-6 text-gray-400" />
              <div className="ml-3">
                <h3 className="text-lg font-medium text-gray-900">Session Management</h3>
                <p className="text-sm text-gray-500">Manage active sessions and timeouts</p>
              </div>
            </div>
            <button className="text-indigo-600 hover:text-indigo-900 text-sm font-medium">
              View Sessions
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}