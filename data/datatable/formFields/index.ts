import { billingsTableData as billing } from './billings-tabledata';
import { buildingTableData as buildings } from './buildings-tabledata';
import { usersTableData as users } from './users-tabledata';
import { statisticsTableData as statistics } from './statistics-tabledata';
import { notificationsTableData as notifications } from './notifications-tabledata';
import { bookmarkTableData as bookmarks } from './bookmark-tableata';
import { commentTableData as comments } from './comment-tabledata';
import { fundRuleTableData as fundRules } from './fundRule-tabledata';
import { fundTableData as funds } from './fund-tabledata';
import { instancesTableData as instances } from './instances-tabledata';
import { proposalTableData as proposals } from './proposal-tabledata';
import { tagTableData as tags } from './tag-tabledata';
import { threadTableData as threads } from './thread-tabledata';
import { userSettingTableData as userSettings } from './userSetting-tabledata';

// /**
//  * typing support when making conditions in jsx (tabelcell component)
//  */
export enum FieldTypes {
  Text = 'text',
  Select = 'select',
  Date = 'date',
  Number = 'number',
  Currency = 'currency',
  Avatar = 'avatar',
  StaticSelect = 'static-select',
}

const formFields: FormFieldsType = {
  billing,
  users,
  statistics,
  notifications,
  buildings,
  bookmarks,
  comments,
  fundRules,
  funds,
  instances,
  proposals,
  tags,
  threads,
  userSettings,
};
export default formFields;
