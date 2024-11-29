import { create } from 'zustand';
import type { User, Role, Permission } from '../types/rbac';

interface RBACState {
  users: User[];
  roles: Role[];
  permissions: Permission[];
  selectedUser: User | null;
  selectedRole: Role | null;
  isLoading: boolean;
  error: string | null;
}

interface RBACActions {
  setUsers: (users: User[]) => void;
  setRoles: (roles: Role[]) => void;
  setPermissions: (permissions: Permission[]) => void;
  setSelectedUser: (user: User | null) => void;
  setSelectedRole: (role: Role | null) => void;
  addUser: (user: Omit<User, 'id' | 'createdAt'>) => void;
  updateUser: (id: string, updates: Partial<User>) => void;
  deleteUser: (id: string) => void;
  addRole: (role: Omit<Role, 'id' | 'createdAt'>) => void;
  updateRole: (id: string, updates: Partial<Role>) => void;
  deleteRole: (id: string) => void;
  addPermission: (permission: Omit<Permission, 'id'>) => void;
  updatePermission: (id: string, updates: Partial<Permission>) => void;
  deletePermission: (id: string) => void;
}

type RBACStore = RBACState & RBACActions;

// Initial mock data
const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    roles: [],
    createdAt: new Date('2024-01-01'),
    lastLogin: new Date('2024-03-15'),
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    roles: [],
    createdAt: new Date('2024-02-01'),
    lastLogin: new Date('2024-03-14'),
  },
];

const mockRoles: Role[] = [
  {
    id: '1',
    name: 'Admin',
    description: 'Full system access',
    permissions: [],
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '2',
    name: 'Editor',
    description: 'Content management access',
    permissions: [],
    createdAt: new Date('2024-02-01'),
  },
];

const mockPermissions: Permission[] = [
  {
    id: '1',
    name: 'View Users',
    description: 'Can view user list',
    resource: 'users',
    action: 'read',
  },
  {
    id: '2',
    name: 'Create Users',
    description: 'Can create new users',
    resource: 'users',
    action: 'create',
  },
];

export const useRBACStore = create<RBACStore>((set) => ({
  users: mockUsers,
  roles: mockRoles,
  permissions: mockPermissions,
  selectedUser: null,
  selectedRole: null,
  isLoading: false,
  error: null,

  setUsers: (users) => set({ users }),
  setRoles: (roles) => set({ roles }),
  setPermissions: (permissions) => set({ permissions }),
  setSelectedUser: (selectedUser) => set({ selectedUser }),
  setSelectedRole: (selectedRole) => set({ selectedRole }),

  addUser: (userData) => set((state) => ({
    users: [...state.users, {
      id: crypto.randomUUID(),
      createdAt: new Date(),
      ...userData,
    }],
  })),

  updateUser: (id, updates) => set((state) => ({
    users: state.users.map((user) =>
      user.id === id ? { ...user, ...updates } : user
    ),
  })),

  deleteUser: (id) => set((state) => ({
    users: state.users.filter((user) => user.id !== id),
  })),

  addRole: (roleData) => set((state) => {
    const newRole = {
      id: crypto.randomUUID(),
      createdAt: new Date(),
      permissions: roleData.permissions || [],
      ...roleData,
    };
    return {
      roles: [...state.roles, newRole]
    };
  }),

  updateRole: (id, updates) => set((state) => ({
    roles: state.roles.map((role) =>
      role.id === id ? { ...role, ...updates } : role
    ),
  })),

  deleteRole: (id) => set((state) => ({
    roles: state.roles.filter((role) => role.id !== id),
  })),

  addPermission: (permissionData) => set((state) => ({
    permissions: [...state.permissions, {
      id: crypto.randomUUID(),
      ...permissionData,
    }],
  })),

  updatePermission: (id, updates) => set((state) => ({
    permissions: state.permissions.map((permission) =>
      permission.id === id ? { ...permission, ...updates } : permission
    ),
  })),

  deletePermission: (id) => set((state) => ({
    permissions: state.permissions.filter((permission) => permission.id !== id),
  })),
}));