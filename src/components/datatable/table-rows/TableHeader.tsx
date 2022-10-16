import React from 'react';
import { useRouter } from 'next/router';
import formFields from '../../../../data/datatable/formFields';
import { Sections } from '../../../types/general/data/datatable/sections-json';

const TableHeader = () => {
  const { query } = useRouter();

  const sectionRowData = formFields[query.entity as Sections];
  sectionRowData?.sort((a, b) => a.priority - b.priority);
  return (
    <thead>
      <tr>
        {sectionRowData?.map((cellData) => (
          <>{!cellData.noTable && <th key={cellData.label}>{cellData.label}</th>}</>
        ))}
      </tr>
      <tr />
    </thead>
  );
};

export default TableHeader;
