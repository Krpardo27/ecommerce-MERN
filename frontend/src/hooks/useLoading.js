import { useContext } from "react";
import { LoadingContext } from "../context/LoadingContext";

export const useLoading = () => {
  const ctx = useContext(LoadingContext);
  if (!ctx) {
    throw new Error("useLoading debe usarse dentro de LoadingProvider");
  }
  return ctx;
};
