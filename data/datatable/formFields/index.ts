import billing from './billings';
import users from './users';
import statistics from './statistics';
import notifications from './notifications';
import { FormFields } from '../../../src/types/general/data/dataTable/sections-json';

/**
 * typing support when making conditions in jsx (tabelcell component)
 */
export enum FieldTypes {
  Text = 'text',
  Select = 'select',
  Date = 'date',
  Number = 'number',
  Currency = 'currency',
  Avatar = 'avatar',
  StaticSelect = 'static-select',
}

const formFields: FormFields = { billing, users, statistics, notifications };
export default formFields;
