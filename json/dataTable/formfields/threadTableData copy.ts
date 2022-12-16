export const threadTableData: Array<FormFieldInterface> = [
  {
    id: 'amount',
    name: 'amount',
    label: 'Balance',
    placeholder: 'Have you ever seen...?',
    type: 'text',
    hideFromForm: true,
    required: false,
    priority: 1,
  },

  {
    id: 'user',
    name: 'user',
    label: 'User',
    type: 'select',
    multi: true,
    entitySingle: 'user',
    entityPlural: 'users',
    selectValues: ['name'],
    required: false,
    hideFromForm: true,
    priority: 2,
  },
];
