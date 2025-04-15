'use client'

import { useLogout } from '@/hooks/useAuth';
import { useAuthStore } from '@/stores/auth';
import alertDispatch from '@/utils/alertDispatch';
import { routes } from '@/utils/routes';
import { Button } from '@pellegrinidev/piggy-ui';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function Home() {

  const logout = useLogout();
  const router = useRouter();
  const user = useAuthStore((state) => state.user);

  const handleLogout = () => {
    logout.mutateAsync(undefined, {
      onSuccess(data) {
        alertDispatch(data);
        router.push(routes.home);
      }
    });
  }

  return (
    <div>
      Cofrinho - {user?.name}
      <Button onClick={handleLogout}>Sair</Button>
    </div>
  );
}