import React, { Fragment } from 'react';
import { useRouter } from 'next/router';
import formFields from '../../../../data/dataTable/formfields';

const TableHeader = () => {
  const { query } = useRouter();

  const sectionRowData = formFields[query.entity as Sections];
  sectionRowData?.sort((a, b) => a.priority - b.priority);
  return (
    <thead>
      <tr>
        {sectionRowData?.map((cellData) => (
          <Fragment key={cellData.label}>{!cellData.noTable && <th>{cellData.label}</th>}</Fragment>
        ))}
      </tr>
      <tr />
    </thead>
  );
};

export default TableHeader;
