import React from 'react';
import { Shield, Edit, Trash2, Mic, MicOff } from 'lucide-react';
import { useRBACStore } from '../store/rbacStore';
import RoleModal from '../components/roles/RoleModal';
import DraggableRoleAssignment from '../components/roles/DraggableRoleAssignment';
import PermissionDependencyGraph from '../components/permissions/PermissionDependencyGraph';
import { useVoiceCommands } from '../hooks/useVoiceCommands';
import { useRealTimeUpdates } from '../hooks/useRealTimeUpdates';
import type { Role } from '../types/rbac';

export default function RolesPage() {
  const { roles, deleteRole } = useRBACStore();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedRole, setSelectedRole] = React.useState<Role | undefined>();
  const { isListening, setIsListening } = useVoiceCommands();
  
  // Initialize real-time updates
  useRealTimeUpdates();

  const handleEdit = (role: Role) => {
    setSelectedRole(role);
    setIsModalOpen(true);
  };

  const handleDelete = (roleId: string) => {
    if (window.confirm('Are you sure you want to delete this role?')) {
      deleteRole(roleId);
    }
  };

  const handleAddRole = () => {
    setSelectedRole(undefined);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Roles</h2>
        <div className="flex space-x-2">
          <button
            onClick={handleAddRole}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-indigo-700"
          >
            <Shield className="w-5 h-5 mr-2" />
            Create Role
          </button>
          <button
            onClick={() => setIsListening(!isListening)}
            className={`p-2 rounded-lg ${
              isListening ? 'bg-red-600' : 'bg-gray-600'
            } text-white`}
          >
            {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Add drag and drop interface */}
      <div className="mb-8">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Drag to Reorder Roles</h3>
        <DraggableRoleAssignment />
      </div>

      {/* Add permission dependency visualization */}
      <div className="mb-8">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Permission Dependencies</h3>
        <div className="h-[400px] bg-white rounded-lg p-4">
          <PermissionDependencyGraph />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {roles.map((role) => (
          <div key={role.id} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">{role.name}</h3>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(role)}
                  className="text-indigo-600 hover:text-indigo-900"
                >
                  <Edit className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleDelete(role.id)}
                  className="text-red-600 hover:text-red-900"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
            <p className="text-sm text-gray-500 mb-4">{role.description}</p>
            <div className="space-y-2">
              <div className="text-xs font-medium text-gray-500 uppercase">Permissions</div>
              <div className="flex flex-wrap gap-2">
                {role.permissions.map((permission) => (
                  <span
                    key={permission.id}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
                  >
                    {permission.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <RoleModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedRole(undefined);
        }}
        role={selectedRole}
      />
    </div>
  );
}