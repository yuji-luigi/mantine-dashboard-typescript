export const spacesTableData: Array<FormFieldInterface> = [
  {
    id: 'name',
    name: 'name',
    label: 'Name',
    placeholder: 'Building East/Quarto oggiaro district(whole city as building)',
    type: 'text',
    cellType: 'link-children',
    required: true,
    priority: 1,
  },
  {
    id: 'address',
    name: 'address',
    label: 'address',
    placeholder: 'Golden street 334',
    type: 'text',
    required: true,
    priority: 1,
  },
  {
    id: 'isTail',
    name: 'isTail',
    label: 'Tip of the space?',
    placeholder: 'Golden street 334',
    type: 'boolean',
    required: true,
    priority: 1,
  },

  {
    id: 'password',
    name: 'password',
    label: 'password',
    type: 'text',
    // multi: true,
    required: false,
    priority: 2,
  },

  {
    id: 'owner',
    name: 'owner',
    label: 'Owner',
    type: 'select',
    _entity: 'owners',
    selectValues: ['name', 'email'],
    grantTo: ['super_admin'],
    required: false,
    priority: 100,
  },
];
