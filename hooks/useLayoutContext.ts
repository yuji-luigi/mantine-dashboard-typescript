import { useContext } from 'react';
import { DashboardLayoutContext } from '../src/context/DashboardLayoutContext';

const useLayoutContext = () => {
  const context = useContext(DashboardLayoutContext);
  if (!context) {
    throw new Error('Layout context must be used inside DashboardLayoutContextProvider');
  }
  return context;
};

export default useLayoutContext;
