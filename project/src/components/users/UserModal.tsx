import React from 'react';
import { X } from 'lucide-react';
import { useRBACStore } from '../../store/rbacStore';
import type { User } from '../../types/rbac';

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  user?: User;
}

export default function UserModal({ isOpen, onClose, user }: UserModalProps) {
  const { addUser, updateUser, roles } = useRBACStore();
  const [formData, setFormData] = React.useState({
    name: user?.name || '',
    email: user?.email || '',
    selectedRoles: user?.roles.map(role => role.id) || [],
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, selectedRoles } = formData;
    const selectedRolesData = roles.filter(role => selectedRoles.includes(role.id));

    if (user) {
      updateUser(user.id, {
        name,
        email,
        roles: selectedRolesData,
      });
    } else {
      addUser({
        name,
        email,
        roles: selectedRolesData,
      });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">
            {user ? 'Edit User' : 'Add New User'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Roles
            </label>
            <div className="mt-2 space-y-2">
              {roles.map((role) => (
                <label key={role.id} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.selectedRoles.includes(role.id)}
                    onChange={(e) => {
                      const newSelectedRoles = e.target.checked
                        ? [...formData.selectedRoles, role.id]
                        : formData.selectedRoles.filter(id => id !== role.id);
                      setFormData({ ...formData, selectedRoles: newSelectedRoles });
                    }}
                    className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="ml-2 text-sm text-gray-900">{role.name}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700"
            >
              {user ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}