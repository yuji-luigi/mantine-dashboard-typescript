import { useContext } from 'react';
import { DashboardLayoutContext } from '../context/DashboardLayoutContext';

const useLayoutContext = () => {
  const context = useContext(DashboardLayoutContext);
  if (!context) throw new Error('Auth context must be used inside DashboardLayoutContextProvider');
  return context;
};

export default useLayoutContext;
