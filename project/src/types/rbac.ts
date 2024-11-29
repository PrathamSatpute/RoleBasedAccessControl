export interface User {
  id: string;
  name: string;
  email: string;
  roles: Role[];
  createdAt: Date;
  lastLogin?: Date;
}

export interface Role {
  id: string;
  name: string;
  description: string;
  permissions: Permission[];
  createdAt: Date;
}

export interface Permission {
  id: string;
  name: string;
  description: string;
  resource: string;
  action: 'create' | 'read' | 'update' | 'delete';
}