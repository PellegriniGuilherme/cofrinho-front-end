import { getBalance} from "@/api/services/transactionService";
import { useQuery } from "@tanstack/react-query"


export const useBalance = () => {
  return useQuery({
    queryKey: ["balance"],
    queryFn: async () => {
      const response = await getBalance();
      return response;
    },
  });
}

