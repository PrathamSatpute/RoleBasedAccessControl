import { useEffect } from 'react';
import useWebSocket from 'react-use-websocket';
import { useRBACStore } from '../store/rbacStore';

export function useRealTimeUpdates() {
  const { setUsers, setRoles, setPermissions } = useRBACStore();
  const { lastMessage } = useWebSocket('ws://your-websocket-server/rbac', {
    shouldReconnect: () => true,
  });

  useEffect(() => {
    if (lastMessage) {
      const data = JSON.parse(lastMessage.data);
      
      switch (data.type) {
        case 'USERS_UPDATE':
          setUsers(data.users);
          break;
        case 'ROLES_UPDATE':
          setRoles(data.roles);
          break;
        case 'PERMISSIONS_UPDATE':
          setPermissions(data.permissions);
          break;
      }
    }
  }, [lastMessage, setUsers, setRoles, setPermissions]);
} 