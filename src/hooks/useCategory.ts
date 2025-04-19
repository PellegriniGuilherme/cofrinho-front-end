import { Category, createCategory, deleteCategory, getCategories, updateCategory } from "@/api/services/categoryService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await getCategories();
      return response;
    },
  });
}

export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Omit<Category, 'id' | 'created_at' | 'updated_at'>) => {
      const response = await createCategory(data);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
}

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Omit<Category, 'created_at' | 'updated_at'> ) => {
      const response = await updateCategory(data.id, { color: data.color, name: data.name });
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
}

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const response = await deleteCategory(id);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
}