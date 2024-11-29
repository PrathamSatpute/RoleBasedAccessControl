import React from 'react';
import { Bell, Sun, Moon, User } from 'lucide-react';

export default function Header() {
  const [isDark, setIsDark] = React.useState(false);

  return (
    <header className="bg-white border-b border-gray-200 h-16 flex items-center px-6 justify-between">
      <h1 className="text-xl font-semibold text-gray-800">RBAC Dashboard</h1>
      <div className="flex items-center space-x-4">
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <Bell className="w-5 h-5 text-gray-600" />
        </button>
        <button 
          className="p-2 hover:bg-gray-100 rounded-full"
          onClick={() => setIsDark(!isDark)}
        >
          {isDark ? (
            <Sun className="w-5 h-5 text-gray-600" />
          ) : (
            <Moon className="w-5 h-5 text-gray-600" />
          )}
        </button>
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <User className="w-5 h-5 text-gray-600" />
        </button>
      </div>
    </header>
  );
}