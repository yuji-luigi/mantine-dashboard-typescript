import React from "react";
// import { UsersRolesTable } from './UsersRolesSwitchTable';
import { UsersTable } from "./UsersTable";
// import data1 from '../../../data/mock/usersRolesSwitchDatatable.json';
// import data2 from '../../../data/mock/usersStack.json';
import data3 from "../../../data/mock/usersDatatable.json";
// import { UsersStack } from './UsersStack';

const Tables = ({entityOverride = ''}: {entityOverride?: Sections}) => (
  <>
    <UsersTable entityOverride={entityOverride} />
    {/* <UsersRolesTable data={data1.data} />
    <UsersStack data={data2.data} /> */}
  </>
);

export default Tables;
