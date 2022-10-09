import React from 'react';
import { UsersRolesTable } from './UsersRolesSwitchTable';
import { UsersTable } from './UsersTable';
import data1 from '../../../data/mock/usersRolesSwitchDatatable.json';
import data2 from '../../../data/mock/usersStack.json';
import data3 from '../../../data/mock/usersDatatable.json';
import { UsersStack } from './UsersStack';

const Tables = () => (
  <>
    <UsersTable data={data3.data} />
    <UsersRolesTable data={data1.data} />
    <UsersStack data={data2.data} />
  </>
);

export default Tables;
