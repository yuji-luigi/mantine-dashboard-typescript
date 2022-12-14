import React, { ReactElement } from 'react';
import AuthGuard from '../guards/AuthGuard';
import DashboardLayout from './dashboard/DashboardLayout';
import { MainLayout } from './main';

export type LayoutVariants = 'main' | 'logoOnly' | 'dashboard';

const Layout = ({
  variant = 'dashboard',
  children,
}: {
  variant?: LayoutVariants;
  children: ReactElement;
}) => {
  if (variant === 'logoOnly') {
    return (
      <>
        <p>logo only layout</p>
        {children}
      </>
    );
  }
  // homepage
  if (variant === 'main') {
    return <MainLayout>{children}</MainLayout>;
  }
  return (
    <AuthGuard>
      <DashboardLayout>{children}</DashboardLayout>
    </AuthGuard>
  );
};

export default Layout;
