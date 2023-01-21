import React from 'react';
// import { UsersRolesTable } from './UsersRolesSwitchTable';
import { UsersTable } from './UsersTable';
// import data1 from '../../../data/mock/usersRolesSwitchDatatable.json';
// import data2 from '../../../data/mock/usersStack.json';
// import data3 from '../../../json/mock/usersDatatable.json';
// import { UsersStack } from './UsersStack';

const Tables = ({ entityOverride }: { entityOverride?: string }) => (
  <>
    <UsersTable entityOverride={entityOverride} />
  </>
);

export default Tables;
