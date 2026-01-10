import { createContext, useContext, useState, useCallback } from "react";

export const LoadingContext = createContext(null);

export const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  const showLoader = useCallback(() => setIsLoading(true), []);
  const hideLoader = useCallback(() => setIsLoading(false), []);

  return (
    <LoadingContext.Provider
      value={{ isLoading, showLoader, hideLoader }}
    >
      {children}
    </LoadingContext.Provider>
  );
};


