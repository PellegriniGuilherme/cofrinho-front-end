import { api } from '../api';

export interface Category {
  id: number;
  name: string;
  color: string;
  created_at: string;
  updated_at: string;
}

export const getCategories = async () => {
  try {
    const response = await api.get('/categories');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createCategory = async (data: Omit<Category, 'id' | 'created_at' | 'updated_at'>) => {
  try {
    const response = await api.post('/categories', data);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const updateCategory = async (id: number, data: Omit<Category, 'id' | 'created_at' | 'updated_at'>) => {
  try {
    const response = await api.put(`/categories/${id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteCategory = async (id: number) => {
  try {
    const response = await api.delete(`/categories/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};