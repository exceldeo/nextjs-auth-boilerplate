import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { fetchProtectedData, type ItemsResponse } from "@/libs/api";

export const useProtectedData = (): UseQueryResult<ItemsResponse, Error> => {
  return useQuery({
    queryKey: ["protectedData"],
    queryFn: fetchProtectedData,
    retry: 1,
    enabled: false, // Don't fetch automatically
  });
};
