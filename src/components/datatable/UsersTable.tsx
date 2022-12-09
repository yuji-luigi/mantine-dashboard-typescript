import {
  Table,
  ScrollArea,
  Pagination,
  Group,
  ActionIcon,
} from "@mantine/core";
import { useState } from "react";

import { useRouter } from "next/router";
import { IconPencil, IconTrash } from "@tabler/icons";
import { TableRow } from "./table-rows/TableRow";
import { TableCellDecorator } from "./TableCellDecorator";
import users from "../../../data/mock/usersDatatable.json";
import TableHeader from "./table-rows/TableHeader";
// import TableCell from './table-rows/tablecell/TableCell';
import formFields from "../../../data/dataTable/formfields";
import { useCrudSlice } from "../../hooks/redux-hooks/useCrudSlice";

export function UsersTable(/* { data }: { data: Array<UsersTableRow> } */{entityOverride = ''}: {entityOverride: Sections}) {
  const ROWS_PER_PAGE = 5;
  const TOTAL = Math.ceil(users.length / ROWS_PER_PAGE);
  const [page, setPage] = useState(1);
  
  const { query } = useRouter();
  const { crudDocuments } = useCrudSlice(query.entity as Sections);

  const sectionFormFields = formFields[query.entity as Sections];
  if (!sectionFormFields) {
    return <h1>Please provide the formField.json file to display the table</h1>;
  }
  sectionFormFields.sort((a, b) => a.priority - b.priority);

  return (
    <>
      <ScrollArea>
        <Table sx={{ minWidth: 800 }} highlightOnHover>
          <TableHeader />
          <tbody>
            {/* TODO: screate crudDocuments type that includes all possible fields in mongooseDocument.  */}
            {crudDocuments?.map((rowData: { _id: string }) => (
              <TableRow
                key={rowData._id}
                sectionFormFields={sectionFormFields}
                rowData={rowData}
              />
            ))}
            <tr>
              <td />
            </tr>
          </tbody>
        </Table>
      </ScrollArea>
      <Pagination page={page} onChange={setPage} total={TOTAL} />
    </>
  );
}
