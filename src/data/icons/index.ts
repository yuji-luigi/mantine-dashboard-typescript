import {
  Icon2fa as Authentication,
  IconBellRinging as Notification,
  IconDashboard as Dashboard,
  IconDatabaseImport as Database,
  IconFingerprint as Security,
  IconHomeStats as Statistic,
  IconKey as Key,
  IconReceipt2 as Receipt,
  IconSettings as Cog,
  IconSwitchHorizontal as SwitchHorizontal,
  IconLogout as Logout,
  IconUser as User,
  TablerIcon,
} from '@tabler/icons';

export type IconsType =
  | 'Authentication'
  | 'Notification'
  | 'Dashboard'
  | 'Database'
  | 'Security'
  | 'Statistic'
  | 'Key'
  | 'Receipt'
  | 'Cog'
  | 'Logout'
  | 'SwitchHorizontal'
  | 'User';

export const Icons: Record<IconsType, TablerIcon> = {
  Authentication,
  Notification,
  Dashboard,
  Database,
  Security,
  Statistic,
  Key,
  Receipt,
  Cog,
  Logout,
  SwitchHorizontal,
  User,
};
