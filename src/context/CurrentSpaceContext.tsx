import { createContext, ReactNode, useContext, useState } from 'react';

export const CurrentSpaceContext = createContext<CurrentSpaceContextState>({
  currentSpace: null,
  setCurrentSpace: (space: CurrentSpace | null) => {},
});

const useStore = () => {
  const [currentSpace, setCurrentSpace] = useState<CurrentSpace | null>(null);
  return {
    currentSpace,
    setCurrentSpace,
  };
};

export const CurrentSpaceContextProvider = ({ children }: { children: ReactNode }) => (
  <CurrentSpaceContext.Provider value={useStore()}>{children}</CurrentSpaceContext.Provider>
);

export const useCurrentSpaceContext = () => useContext(CurrentSpaceContext);
