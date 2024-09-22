import { createContext } from "react";

import { ReactNode } from "react";

export const cycleContext = createContext({});

interface ICycleContextProvProps {
  children: ReactNode;
}

export function CycleContextProvider({ children }: ICycleContextProvProps) {
  return <cycleContext.Provider value={{}}>{children}</cycleContext.Provider>;
}
