import { useContext } from 'react';
import { AuthContext } from '../src/context/JWTContext';

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('Auth context must be used inside AuthProvider');
  return context;
};

export default useAuth;
