import React, { Fragment } from 'react';
import { useRouter } from 'next/router';
import formFields from '../../../../json/dataTable/formfields';
import { Sections } from '../../../types/general/data/sections-type';

const TableHeader = ({ overridingEntity }: { overridingEntity: Sections }) => {
  const { query } = useRouter();

  const sectionRowData = formFields[overridingEntity || (query.entity as Sections)];
  sectionRowData?.sort((a, b) => a.priority - b.priority);
  return (
    <thead>
      <tr>
        {sectionRowData?.map((cellData) => (
          <Fragment key={cellData.id}>{!cellData.noTable && <th>{cellData.label}</th>}</Fragment>
        ))}
        <th>actions</th>
      </tr>
      <tr />
    </thead>
  );
};

export default TableHeader;
