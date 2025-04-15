'use client'

import { useSession } from "@/hooks/useAuth";
import { useAuthStore } from "@/stores/auth";
import { useEffect } from "react";

const CofrinhoLayout: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const setUser = useAuthStore((s) => s.setUser);
  const clearUser = useAuthStore((s) => s.clearUser);

  const { data, error } = useSession();

  useEffect(() => {
    if (data) {
      setUser(data.data);
    }
  }, [data, setUser]);

  useEffect(() => {
    if (error) {
      clearUser();
      window.location.reload();
    }
  }, [error, clearUser]);

  return (
    <div className='flex flex-col w-full h-full'>
      {children}
    </div>
  )
}

export default CofrinhoLayout;