import { useQuery } from "@tanstack/react-query";
import { getMeApi } from "../../api/auth";

export const useMe = () => {
  const token = localStorage.getItem("AUTH_TOKEN");

  return useQuery({
    queryKey: ["auth", "me"],
    enabled: Boolean(token),
    queryFn: getMeApi,
    retry: false,
    staleTime: 1000 * 60 * 5,
  });
};
