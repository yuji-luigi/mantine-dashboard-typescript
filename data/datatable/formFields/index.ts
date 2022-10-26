import { billingsTableData as billing } from './billingsTableData';
import { usersTableData as users } from './usersTableData';
import { statisticsTableData as statistics } from './statisticsTableData';
import { notificationsTableData as notifications } from './notificationsTableData';

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

const formFields: FormFieldsType = { billing, users, statistics, notifications };
export default formFields;
