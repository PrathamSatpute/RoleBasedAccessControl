import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRBACStore } from '../store/rbacStore';

export function useVoiceCommands() {
  const [isListening, setIsListening] = useState(false);
  const navigate = useNavigate();
  const { addRole, addPermission } = useRBACStore();

  useEffect(() => {
    if (!('webkitSpeechRecognition' in window)) {
      console.warn('Speech recognition is not supported in this browser');
      return;
    }

    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onresult = (event: any) => {
      const command = event.results[event.results.length - 1][0].transcript.toLowerCase();

      // Navigation commands
      if (command.includes('go to users')) {
        navigate('/users');
      } else if (command.includes('go to roles')) {
        navigate('/roles');
      } else if (command.includes('go to permissions')) {
        navigate('/permissions');
      }

      // Action commands
      if (command.includes('create role')) {
        const roleName = command.replace('create role', '').trim();
        if (roleName) {
          addRole({
            name: roleName,
            description: `Role created by voice command: ${roleName}`,
            permissions: []
          });
        }
      }
    };

    if (isListening) {
      recognition.start();
    } else {
      recognition.stop();
    }

    return () => {
      recognition.stop();
    };
  }, [isListening, navigate, addRole]);

  return { isListening, setIsListening };
} 