import { createContext, ReactNode, useState } from "react";

export const DashboardLayoutContext =
  createContext<DashboardLayoutContextStates>({
    isOpen: false,
    toggleBarOpen() {},
    closeBar() {},
    openBar() {},
  });

const useStore = () => {
  const [isOpen, setBarOpen] = useState(false);
  return {
    isOpen,
    toggleBarOpen: () => setBarOpen(!isOpen),
    closeBar: () => setBarOpen(false),
    openBar: () => setBarOpen(true),
  };
};

export const DashboardLayoutContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => (
  <DashboardLayoutContext.Provider value={useStore()}>
    {children}
  </DashboardLayoutContext.Provider>
);
