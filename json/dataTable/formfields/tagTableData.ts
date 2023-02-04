export const tagTableData: Array<FormFieldInterface> = [
  {
    id: 'name',
    name: 'name',
    label: 'name',
    placeholder: 'tag red',
    type: 'text',
    required: true,
    priority: 1,
  },
  {
    id: 'description',
    name: 'description',
    label: 'description',
    placeholder: 'Description',
    type: 'text',
    required: true,
    priority: 1,
  },
  {
    id: 'color',
    name: 'color',
    label: 'color',
    type: 'color',
    required: false,
    priority: 2,
  },
  {
    id: 'building',
    name: 'building',
    label: 'created by',
    type: 'select',
    multi: true,
    _entity: 'buildings',
    selectValues: ['name'],
    required: false,
    priority: 2,
  },
  {
    id: 'owner',
    name: 'owner',
    label: 'created by',
    type: 'select',
    multi: true,
    _entity: 'owners',
    selectValues: ['name'],
    required: false,
    priority: 2,
  },
];
