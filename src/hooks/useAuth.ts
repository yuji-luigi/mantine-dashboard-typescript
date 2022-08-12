import { useContext } from 'react';
import { AuthContext } from '../context/JWTContext';

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('Auth context must be used inside AuthProvider');
  return context;
};

export default useAuth;
