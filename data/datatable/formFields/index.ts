import billing from './billings';
import home from './users';
import statistics from './statistics';
import notifications from './notifications';
import { FormFields } from '../../../src/types/general/data/datatable/sections-json';

export enum FieldTypes {
  Text = 'text',
  Select = 'select',
  Date = 'date',
  Number = 'number',
  Currency = 'currency',
  Avatar = 'avatar',
}

const formFields: FormFields = { billing, home, statistics, notifications };
export default formFields;
