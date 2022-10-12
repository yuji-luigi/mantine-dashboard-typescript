const users: Array<FormField> = [
  {
    id: 'name',
    name: 'name',
    label: 'Nome',
    type: 'text',
    // hidden:
    // table:
    // readonly:
    required: true,
    priority: 1,
  },
  {
    id: 'surname',
    name: 'surname',
    label: 'Cognome',
    type: 'text',
    required: true,
    // hidden:
    // table:
    // readonly:
    priority: 2,
  },
  {
    id: 'role',
    name: 'role',
    label: 'Ruolo',
    type: 'select',
    options: ['super_admin', 'admin', 'operatore', 'supervisore', 'manutentore'],
    required: true,
    priority: 3,
  },
  {
    id: 'email',
    name: 'email',
    label: 'Email',
    type: 'text',
    required: true,
    // hidden:
    // table:
    // readonly:
    priority: 4,
  },
  {
    id: 'phone',
    name: 'phone',
    label: 'Telefono',
    type: 'text',
    required: false,
    // hidden:
    // table:
    // readonly:
    priority: 5,
  },
  {
    id: 'password',
    name: 'password',
    label: 'Password',
    type: 'text',
    required: true,
    noTable: true,
    // readonly:
    priority: 6,
  },
  {
    id: 'buildings',
    name: 'buildings',
    label: 'Struttura',
    type: 'select',
    entitySingle: 'building',
    entityPlural: 'buildings',
    selectValues: ['name'],
    // noTable: true,
    multi: true,
    required: false,
    priority: 100,
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
    // noTable: true,
    required: false,
    priority: 100,
  },
];

export default users;
