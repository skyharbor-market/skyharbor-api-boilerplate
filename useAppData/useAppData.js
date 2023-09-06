import { createContext, useContext } from "react";

export const AppContext = createContext();

export const useAppData = () => {
  return useContext(AppContext);
};
