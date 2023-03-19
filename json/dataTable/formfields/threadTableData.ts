export const threadTableData: Array<FormFieldInterface> = [
  {
    id: 'title',
    name: 'title',
    label: 'Title',
    placeholder: 'Have you ever seen...?',
    type: 'text',
    required: true,
    priority: 1,
  },
  {
    id: 'description',
    name: 'description',
    label: 'Texts',
    placeholder: 'Have you ever seen the cat with 6 colors?...',
    type: 'long-text',
    required: true,
    priority: 1,
  },
  {
    id: 'tags',
    name: 'tags',
    label: 'tag',
    placeholder: 'Tag',
    type: 'text',
    required: true,
    priority: 1,
  },

  {
    id: 'images',
    name: 'images',
    label: 'Photos',
    type: 'image',
    multi: true,
    // type: 'dropzone',
    selectValues: ['name'],
    required: false,
    priority: 2,
  },
  {
    id: 'attachments',
    name: 'attachments',
    multi: true,
    label: 'Attachments',
    type: 'attachment',
    selectValues: ['name'],
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
  {
    id: 'isImportant',
    name: 'isImportant',
    label: 'Important',
    type: 'checkbox',
    required: false,
  },
];
