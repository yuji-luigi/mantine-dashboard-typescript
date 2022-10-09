import { useEffect, useState } from 'react';
// Next js
import { useRouter } from 'next/router';

// hooks
import useAuth from '../hooks/useAuth';
import LoginPage from '../sections/auth/LoginPageComponent';

export default function AuthGuard({ children }: { children: JSX.Element | JSX.Element[] }) {
  const { isAuthenticated, isInitialized } = useAuth();
  const { pathname, push } = useRouter();
  const [requestedLocation, setRequestedLocation] = useState<string | null>(null);

  useEffect(() => {
    if (requestedLocation && pathname !== requestedLocation) {
      console.log('AuthGuard if (requestedLocation && pathname !== requestedLocation)');

      push(requestedLocation);
    }
    if (isAuthenticated) {
      console.log('AuthGuard isAuthenticated');

      setRequestedLocation(null);
    }
  }, [isAuthenticated, pathname, push, requestedLocation]);

  if (!isInitialized) {
    console.log('Is not initialized');
    return <p>loading screen</p>;
  }

  if (!isAuthenticated) {
    if (pathname !== requestedLocation) {
      console.log('is not authenticated set location');
      setRequestedLocation(pathname);
    }
    console.log(' AuthGuard LoginPage. (not authenticated)');

    return <LoginPage />;
  }
  console.log('AuthGuard children');

  return <>{children};</>;
}
