import { api, ApiResponse } from '../api';
import { Category } from './categoryService';

export interface Account {
  id: number;
  balance: number;
  created_at: string;
  updated_at: string;
}

export interface Transaction {
  id: number;
  category: Category;
  account: string;
  type: 'income' | 'expense';
  amount: number;
  description?: string;
  happened_at?: string;
}

export interface PaginatedData<T> {
  current_page: number;
  data: T[];
  last_page: number;
  next_page_url: string | null;
  prev_page_url: string | null;
  total: number;
  per_page: number;
  from: number;
  to: number;
}

export interface DashboardCategorySummary {
  category: string;
  category_color: string;
  total: string;
}

export interface Dashboard {
  income: DashboardCategorySummary[];
  expense: DashboardCategorySummary[];
}

export interface DashboardSummary {
  amount: number;
  income: number;
  expense: number;
  dashboard: Dashboard;
}


export const getTransactions = async (
  page: number = 1
): Promise<ApiResponse<PaginatedData<Transaction>>> => {
  const response = await api.get("/transactions", {
    params: { page },
  });
  return response.data;
};

export const getBalance = async (): Promise<ApiResponse<DashboardSummary>> => {
  const response = await api.get("/dashboard/balance");
  return response.data;
}

export const createTransaction = async (data: Omit<Transaction, 'id' | 'category' | 'account' | 'type' >) => {
  try {
    const response = await api.post('/transactions', data);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const updateTransaction = async (id: number, data: Omit<Transaction, 'id' | 'category' | 'account' | 'type' >) => {
  try {
    const response = await api.put(`/transactions/${id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteTransaction = async (id: number) => {
  try {
    const response = await api.delete(`/transactions/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};