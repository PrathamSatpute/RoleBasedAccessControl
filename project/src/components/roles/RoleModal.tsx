import React from 'react';
import { X } from 'lucide-react';
import { useRBACStore } from '../../store/rbacStore';
import type { Role } from '../../types/rbac';

interface RoleModalProps {
  isOpen: boolean;
  onClose: () => void;
  role?: Role;
}

export default function RoleModal({ isOpen, onClose, role }: RoleModalProps) {
  const { addRole, updateRole, permissions } = useRBACStore();
  const [formData, setFormData] = React.useState({
    name: '',
    description: '',
    selectedPermissions: [] as string[],
  });

  React.useEffect(() => {
    if (isOpen) {
      setFormData({
        name: role?.name || '',
        description: role?.description || '',
        selectedPermissions: role?.permissions.map(permission => permission.id) || [],
      });
    }
  }, [isOpen, role]);

  React.useEffect(() => {
    if (!isOpen) {
      setFormData({
        name: '',
        description: '',
        selectedPermissions: [],
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { name, description, selectedPermissions } = formData;
      const selectedPermissionsData = permissions.filter(
        permission => selectedPermissions.includes(permission.id)
      );

      if (role) {
        await updateRole(role.id, {
          name,
          description,
          permissions: selectedPermissionsData,
        });
      } else {
        await addRole({
          name,
          description,
          permissions: selectedPermissionsData,
        });
      }
      onClose();
    } catch (error) {
      console.error('Error saving role:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">
            {role ? 'Edit Role' : 'Create New Role'}
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
              Role Name
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
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Permissions
            </label>
            <div className="mt-2 space-y-2">
              {permissions.map((permission) => (
                <label key={permission.id} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.selectedPermissions.includes(permission.id)}
                    onChange={(e) => {
                      const newSelectedPermissions = e.target.checked
                        ? [...formData.selectedPermissions, permission.id]
                        : formData.selectedPermissions.filter(id => id !== permission.id);
                      setFormData({ ...formData, selectedPermissions: newSelectedPermissions });
                    }}
                    className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="ml-2 text-sm text-gray-900">{permission.name}</span>
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
              {role ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}