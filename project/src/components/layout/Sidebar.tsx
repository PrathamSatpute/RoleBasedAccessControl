import { Users, Shield, Key, Activity, Settings, LayoutDashboard } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const navigation = [
  { name: 'Dashboard', to: '/', icon: LayoutDashboard },
  { name: 'Users', to: '/users', icon: Users },
  { name: 'Roles', to: '/roles', icon: Shield },
  { name: 'Permissions', to: '/permissions', icon: Key },
  { name: 'Audit Logs', to: '/audit', icon: Activity },
  { name: 'Settings', to: '/settings', icon: Settings },
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r border-gray-200">
      <div 
        className="h-16 flex items-center px-6 border-b border-gray-200 cursor-pointer hover:bg-gray-50"
      >
        <Shield className="w-8 h-8 text-indigo-600" />
        <span className="ml-2 text-xl font-bold text-gray-900">RBAC Admin</span>
      </div>
      <nav className="mt-6">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center px-6 py-3 text-gray-700 hover:bg-gray-50 ${
                isActive ? 'bg-indigo-50 text-indigo-700' : ''
              }`
            }
          >
            <item.icon className="w-5 h-5" />
            <span className="ml-3">{item.name}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}