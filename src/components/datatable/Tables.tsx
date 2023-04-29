import React from 'react';
// import { UsersRolesTable } from './UsersRolesSwitchTable';
import { UsersTable } from './UsersTable';
import { Sections } from '../../types/general/data/sections-type';
// import data1 from '../../../data/mock/usersRolesSwitchDatatable.json';
// import data2 from '../../../data/mock/usersStack.json';
// import data3 from '../../../json/mock/usersDatatable.json';
// import { UsersStack } from './UsersStack';

const Tables = ({ overridingEntity }: { overridingEntity?: Sections }) => (
  <>
    <UsersTable overridingEntity={overridingEntity} />
  </>
);

export default Tables;
