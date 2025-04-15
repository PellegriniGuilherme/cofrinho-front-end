import { useMutation, useQuery } from "@tanstack/react-query";
import { login, register, logout, user, forgotPassword, resetPassword } from "@/api/services/authServices";
import { RegisterFormValues } from "@/app/auth/register/page";
import { ResetFormValues } from "@/app/auth/reset-password/page";

export const useLogin = () => {
  return useMutation({
    mutationFn: async (data: { email: string; password: string }) => {
      const response = await login(data.email, data.password);
      return response;
    },
  });
}

export const useRegister = () => {
  return useMutation({
    mutationFn: async (data: RegisterFormValues) => {
      const response = await register(data);
      return response;
    },
  });
}

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: async (email: string) => {
      const response = await forgotPassword(email);
      return response;
    },
  });
}

export const useResetPassword = () => {
  return useMutation({
    mutationFn: async (data: ResetFormValues) => {
      const response = await resetPassword(data);
      return response;
    },
  });
}

export const useLogout = () => {
  return useMutation({
    mutationFn: async () => {
      const response = await logout();
      return response;
    },
  });
}

export const useSession = () => {
  return useQuery({
    queryKey: ["session"],
    queryFn: async () => {
      const response = await user();
      return response;
    },
    initialData: undefined,
    refetchInterval: 1000 * 60 * 3,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    retry: false,
    refetchIntervalInBackground: true,
    gcTime: 0
  });
}