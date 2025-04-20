import { ApiResponse } from "@/api/api";
import { createTransaction, deleteTransaction, getTransactions, PaginatedData, Transaction, updateTransaction } from "@/api/services/transactionService";
import { InfiniteData, useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query"


export const useTransactions = () => {
  return useInfiniteQuery<
    ApiResponse<PaginatedData<Transaction>>,
    Error,
    InfiniteData<ApiResponse<PaginatedData<Transaction>>>,
    ['transactions'],
    number
  >({
    queryKey: ['transactions'],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await getTransactions(pageParam);

      if (response.status === 'error') {
        throw new Error(response.message);
      }

      return response;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const page = lastPage.data?.current_page ?? 1;
      const last = lastPage.data?.last_page ?? 1;

      return page < last ? page + 1 : undefined;
    },
  });
};

export const useCreateTransaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Omit<Transaction, 'id' | 'category' | 'account' | 'type' >) => {
      const response = await createTransaction(data);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["balance"] });
    },
  });
}

export const useUpdateTransaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Omit<Transaction, | 'category' | 'account' | 'type' >) => {
      const response = await updateTransaction(data.id, data);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["balance"] });
    },
  });
}

export const useDeleteTransaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const response = await deleteTransaction(id);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["balance"] });
    },
  });
}