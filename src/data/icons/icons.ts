/**
 * use the key name same as the slice name
 */

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
  IconBook as Bookmark,
  IconMessage as Comment,
  IconBuilding as Building,
  IconRuler as FundRule,
  IconReceipt as Proposal,
  IconBusinessplan as Fund,
  IconBlockquote as Thread,
  IconAlien as Instance,
  IconTag as Tag,
  IconAlertCircle as Alert,
  IconX as Close,
  TablerIcon,
} from '@tabler/icons';

// type IconIndexTypes =
//   | 'bookmarks'
//   | 'comments'
//   | 'buildings'
//   | 'funds'
//   | 'fundRules'
//   | 'instances'
//   | 'proposals'
//   | 'tags'
//   | 'threads'
//   | 'userSettings'
//   | 'authentication'
//   | 'notifications'
//   | 'home'
//   | 'database'
//   | 'security'
//   | 'statistics'
//   | 'key'
//   | 'receipt'
//   | 'cog'
//   | 'logout'
//   | 'switch'
//   | 'user'
//   | 'fundRules'
//   | 'alert';

export const Icons: Record<IconIndexTypes, TablerIcon> = {
  authentication: Authentication,
  notifications: Notification,
  home: Dashboard,
  database: Database,
  security: Security,
  statistics: Statistic,
  key: Key,
  receipt: Receipt,
  cog: Cog,
  logout: Logout,
  switch: SwitchHorizontal,
  user: User,
  bookmarks: Bookmark,
  comments: Comment,
  funds: Fund,
  fundRules: FundRule,
  instances: Instance,
  proposals: Proposal,
  tags: Tag,
  threads: Thread,
  userSettings: Cog,
  alert: Alert,
  buildings: Building,
  close: Close,
};

// export {
//   Icon2fa as authentication,
//   IconBellRinging as notifications,
//   IconDashboard as home,
//   IconDatabaseImport as database,
//   IconFingerprint as security,
//   IconHomeStats as statistics,
//   IconKey as key,
//   IconReceipt2 as receipt,
//   IconSettings as userSettings,
//   IconSwitchHorizontal as switch,
//   IconLogout as logout,
//   IconUser as User,
//   IconBook as bookmarks,
//   IconMessage as comments,
//   IconBuilding as buildings,
//   IconRuler as fundRules,
//   IconReceipt as proposals,
//   IconBusinessplan as funds,
//   IconBlockquote as threads,
//   IconAlien as instances,
//   IconTag as tags,
//   IconAlertCircle as Alert,
//   // TablerIcon,

// } from "@tabler/icons";
