import React from 'react';
import { Key, Edit, Trash2 } from 'lucide-react';
import { useRBACStore } from '../store/rbacStore';
import PermissionModal from '../components/permissions/PermissionModal';
import type { Permission } from '../types/rbac';

export default function PermissionsPage() {
  const { permissions, deletePermission } = useRBACStore();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedPermission, setSelectedPermission] = React.useState<Permission | undefined>();

  const handleEdit = (permission: Permission) => {
    setSelectedPermission(permission);
    setIsModalOpen(true);
  };

  const handleDelete = (permissionId: string) => {
    if (window.confirm('Are you sure you want to delete this permission?')) {
      deletePermission(permissionId);
    }
  };

  const handleAddPermission = () => {
    setSelectedPermission(undefined);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Permissions</h2>
        <button
          onClick={handleAddPermission}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-indigo-700"
        >
          <Key className="w-5 h-5 mr-2" />
          Add Permission
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          {permissions.map((permission) => (
            <div
              key={permission.id}
              className="border border-gray-200 rounded-lg p-4 hover:border-indigo-500 transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-900">{permission.name}</span>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(permission)}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(permission.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <p className="text-sm text-gray-500 mb-2">{permission.description}</p>
              <div className="flex justify-between items-center">
                <div className="text-xs text-gray-400">
                  Resource: {permission.resource}
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  permission.action === 'read' ? 'bg-blue-100 text-blue-800' :
                  permission.action === 'create' ? 'bg-green-100 text-green-800' :
                  permission.action === 'update' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {permission.action}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <PermissionModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedPermission(undefined);
        }}
        permission={selectedPermission}
      />
    </div>
  );
}