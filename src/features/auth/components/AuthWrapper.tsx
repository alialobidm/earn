import { useDisclosure } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import { type ReactNode, useEffect, useState } from 'react';

import { Login } from '@/features/auth';

interface LoginProps {
  children?: ReactNode;
}

export function AuthWrapper({ children }: LoginProps) {
  const [triggerLogin, setTriggerLogin] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { status } = useSession();

  const isAuthenticated = status === 'authenticated';

  const handleLoginTrigger = () => {
    if (!isAuthenticated) {
      onOpen();
    }
  };

  useEffect(() => {
    if (triggerLogin && !isAuthenticated) {
      setTriggerLogin(false);
      onOpen();
    }
  }, [triggerLogin]);

  return (
    <>
      {!!isOpen && <Login isOpen={isOpen} onClose={onClose} />}
      <div onClick={handleLoginTrigger}>{children}</div>
    </>
  );
}
