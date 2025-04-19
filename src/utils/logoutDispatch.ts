'use client';

import { useCallback } from "react";
import alertDispatch from "../utils/alertDispatch";
import { routes } from "../utils/routes";
import { useLogout } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

const useLogoutDispatch = () => {
  const logout = useLogout();
  const router = useRouter();

  const handleLogout = useCallback(() => {
    logout.mutateAsync(undefined, {
      onSuccess(data) {
        alertDispatch(data);
        router.push(routes.home);
      },
    });
  }, [logout, router]);

  return handleLogout;
};

export default useLogoutDispatch;