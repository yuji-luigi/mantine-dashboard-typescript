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
    console.log('LogoOnly Layout');

    return (
      <>
        <p>logo only layout</p>
        {children}
      </>
    );
  }
  if (variant === 'main') {
    console.log('Main Layout');

    return <MainLayout>{children}</MainLayout>;
  }
  console.log('Dashboard Layout');
  return (
    <AuthGuard>
      <DashboardLayout>{children}</DashboardLayout>
    </AuthGuard>
  );
};

export default Layout;
