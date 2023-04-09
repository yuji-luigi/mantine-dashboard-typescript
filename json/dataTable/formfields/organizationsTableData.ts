export const organizationsTableData: Array<FormFieldInterface> = [
  {
    id: 'name',
    name: 'name',
    label: 'Name',
    placeholder: 'Name/Company name',
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
    id: 'phone',
    name: 'phone',
    label: 'phone',
    type: 'text',
    required: false,
    priority: 2,
  },
  {
    id: 'email',
    name: 'email',
    label: 'email',
    type: 'text',
    required: false,
    priority: 2,
  },
  {
    id: 'homepage',
    name: 'homepage',
    label: 'homepage',
    type: 'text',
    required: false,
    priority: 2,
  },
  {
    id: 'logoBanner',
    name: 'logoBanner',
    label: 'logoBanner',
    type: 'text',
    required: false,
    priority: 2,
  },
  {
    id: 'logoSquare',
    name: 'logoSquare',
    label: 'logoSquare',
    type: 'text',
    required: false,
    priority: 2,
  },
  {
    id: 'isPublic',
    name: 'isPublic',
    label: 'Public Organization',
    type: 'boolean',
    required: false,
    priority: 2,
  },
  // {
  //   id: 'building',
  //   name: 'building',
  //   label: 'created by',
  //   type: 'select',
  //   multi: true,
  //   _entity: 'buildings',
  //   selectValues: ['name'],
  //   required: false,
  //   priority: 2,
  // },
  // {
  //   id: 'user',
  //   name: 'user',
  //   label: 'created by',
  //   type: 'select',
  //   multi: true,
  //   _entity: 'users',
  //   selectValues: ['name'],
  //   required: false,
  //   priority: 2,
  // },
];
