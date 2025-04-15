import { RegisterFormValues } from '@/app/auth/register/page';
import { api } from '../api';
import { ResetFormValues } from '@/app/auth/reset-password/page';

export const login = async (email: string, password: string) => {
  try {
    const response = await api.post('/auth/login', {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const register = async (data: RegisterFormValues) => {
  try {
    const response = await api.post('/auth/register', data);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const forgotPassword = async (email: string) => {
  try {
    const response = await api.post('/auth/forgot-password', {
      email,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const resetPassword = async (data: ResetFormValues) => {
  try {
    const response = await api.post('/auth/reset-password', data);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const logout = async () => {
  try {
    const response = await api.post('/auth/logout');
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const user = async () => {
  try {
    const response = await api.get('/auth/user');
    return response.data;
  } catch (error) {
    throw error;
  }
}