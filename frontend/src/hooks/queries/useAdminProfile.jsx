// src/hooks/queries/useAdminProfile.js
import { useQuery } from "@tanstack/react-query";
import { getAdminProfile } from "../../api/admin";

export const ADMIN_PROFILE_QUERY_KEY = ["admin", "profile"];

export const useAdminProfile = () => {
  return useQuery({
    queryKey: ADMIN_PROFILE_QUERY_KEY,
    queryFn: getAdminProfile,
    staleTime: 1000 * 60 * 5, // 5 minutos
    retry: false, // auth no se reintenta
  });
};
