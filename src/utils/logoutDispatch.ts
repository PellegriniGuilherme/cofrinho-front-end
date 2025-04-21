'use client';

import { useCallback } from "react";
import alertDispatch from "../utils/alertDispatch";
import { routes } from "../utils/routes";
import { useLogout } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/auth";

const useLogoutDispatch = () => {
  const logout = useLogout();
  const router = useRouter();
  const clearUser = useAuthStore((s => s.clearUser));

  const handleLogout = useCallback(() => {
    logout.mutateAsync(undefined, {
      onSuccess(data) {
        alertDispatch(data);
        clearUser();
        router.push(routes.home);
      },
    });
  }, [logout, router]);

  return handleLogout;
};

export default useLogoutDispatch;