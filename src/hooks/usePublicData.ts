import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { fetchPublicData, type ItemsResponse } from "@/libs/api";

export const usePublicData = (): UseQueryResult<ItemsResponse, Error> => {
  return useQuery({
    queryKey: ["publicData"],
    queryFn: fetchPublicData,
    retry: 1,
  });
};
