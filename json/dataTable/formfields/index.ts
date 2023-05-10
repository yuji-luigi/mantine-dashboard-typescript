import { maintenancesTableData } from './maintenancesTableData';
import { maintainersTableData } from './maintainersTableData';
import { billingsTableData as billing } from './billingsTableData';
import { buildingTableData as buildings } from './buildingsTableData';
import { usersTableData as users } from './usersTableData';
import { statisticsTableData as statistics } from './statisticsTableData';
import { notificationsTableData as notifications } from './notificationsTableData';
import { bookmarkTableData as bookmarks } from './bookmarkTableData';
import { commentTableData as comments } from './commentTableData';
import { fundRuleTableData as fundRules } from './fundRuleTableData';
import { fundTableData as funds } from './fundTableData';
import { instancesTableData as instances } from './instancesTableData';
import { proposalTableData as proposals } from './proposalTableData';
import { tagTableData as tags } from './tagTableData';
import { threadTableData as threads } from './threadTableData';
import { userSettingTableData as userSettings } from './userSetting-tabledata';
import { organizationsTableData as organizations } from './organizationsTableData';
import { spacesTableData as spaces } from './spacesTableData';
import { uploadsTableData as uploads } from './uploadsTableData';
import { maintenancesTableData as maintenances } from './maintenancesTableData';

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

/**
 * define object formFields
 * that can be indexed by entity.
 * ex: formFields[entity]
 * type for the json files
 *
 * */
const allFormFields: FormFieldsType = {
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
  organizations,
  spaces,
  uploads,
  maintenances,
  maintainers: maintainersTableData,
};
export default allFormFields;
