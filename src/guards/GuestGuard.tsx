import { ReactNode, useEffect } from 'react';
// next
import { useRouter } from 'next/router';
// hooks
import useAuth from '../../hooks/useAuth';
// routes
import { PATH_DASHBOARD } from '../path/page-paths';

// ----------------------------------------------------------------------

export default function GuestGuard({ children }: { children: ReactNode }) {
  const { push } = useRouter();

  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      // push(PATH_DASHBOARD.root);
      push(PATH_DASHBOARD.chooseRootSpace);
    }
  }, [isAuthenticated]);
  return <>{children}</>;
}
