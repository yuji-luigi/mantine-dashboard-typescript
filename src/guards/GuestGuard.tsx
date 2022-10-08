import { ReactNode, useEffect } from 'react';
// next
import { useRouter } from 'next/router';
// hooks
import useAuth from '../hooks/useAuth';
// routes
import { DASHBOARD } from '../path/page-paths';

// ----------------------------------------------------------------------

export default function GuestGuard({ children }: { children: ReactNode }) {
  const { push } = useRouter();

  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      push(DASHBOARD);
    }
  }, [isAuthenticated]);

  return <>{children}</>;
}
