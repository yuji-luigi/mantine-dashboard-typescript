import { useEffect } from 'react';
// next
import { useRouter } from 'next/router';
// config
import { PATH_AFTER_LOGIN, PATH_DASHBOARD } from '../../path/page-paths';
// routes

// ----------------------------------------------------------------------

export default function Index() {
  const { pathname, replace, prefetch } = useRouter();
  useEffect(() => {
    if (pathname === PATH_DASHBOARD.root) {
      replace(PATH_DASHBOARD.posts);
    }
  }, [pathname]);

  useEffect(() => {
    prefetch(PATH_AFTER_LOGIN);
  }, []);

  return null;
}
