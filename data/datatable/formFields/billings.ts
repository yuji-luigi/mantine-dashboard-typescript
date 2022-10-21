import { FormField } from '../../../src/types/general/data/dataTable/sections-json';

const billings: Array<FormField> = [
  {
    id: 'amount',
    name: 'amount',
    label: 'Amount',
    type: 'currency',
    required: true,
    priority: 4,
  },
  {
    id: 'to',
    name: 'to',
    label: 'To',
    type: 'select',
    entityPlural: 'users',
    entitySingle: 'user',
    required: false,
    priority: 5,
  },
  {
    id: 'customer',
    name: 'customer',
    label: 'Cliente',
    type: 'select',
    entitySingle: 'customer',
    entityPlural: 'customers',
    selectValues: ['ragioneSociale'],
    grantTo: ['super_admin'],
    required: false,
    priority: 100,
  },
];

export default billings;
