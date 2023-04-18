import React from 'react';
import { Group, Avatar, Text } from '@mantine/core';
import { SpecificTableCell } from './SpecificTableCell';
import { FieldTypes } from '../../../../../json/dataTable/formfields';
// import { IconPencil, IconTrash } from '@tabler/icons-react';
// import { UsersTableRow } from '../../../../types/general/data/datatable/objects';
export const jobColors: Record<string, string> = {
  engineer: 'blue',
  manager: 'cyan',
  designer: 'pink',
};

const TableCell = ({
  cellData,
  cellConfig,
  rowData,
}: {
  cellData: string;
  cellConfig: FormFieldInterface;
  rowData: any;
}) => {
  if (cellConfig.noTable) {
    return null;
  }

  /**
   *  Define case cellType is specified in the tableData.
   * FormType is the same as the type but cell is different.
   */
  if (cellConfig.cellType) {
    return <SpecificTableCell rowData={rowData} cellData={cellData} cellConfig={cellConfig} />;
  }

  return (
    <>
      {cellConfig.type === FieldTypes.Avatar && (
        <Group spacing="xs">
          <Avatar size={40} src={cellData} radius={30} />
        </Group>
      )}

      {(cellConfig.type === 'text' || cellConfig.type === 'long-text') && (
        <Group spacing="sm">
          <Text size="md" weight={500}>
            {cellData}
          </Text>
        </Group>
      )}
      {cellConfig.type === 'static-select' && (
        <Group spacing="sm">
          <Text size="sm" weight={500}>
            {cellData}
          </Text>
        </Group>
      )}
      {cellConfig.type === 'select' && (
        <Text size="xs" weight={500}>
          {cellData}
        </Text>
      )}

      {/*
        <Badge
          color={jobColors[cellData?.toLowerCase()]}
          variant={theme.colorScheme === 'dark' ? 'light' : 'outline'}
        >
          {cellData}
        </Badge>
      */}

      {/* <td>
        <Anchor<'a'> size="sm" href="#" onClick={(event) => event.preventDefault()}>
          {cellData}
        </Anchor>
      </td> */}

      {/* <td>
        <Text size="sm" color="dimmed">
          {cellData}
        </Text>
      </td> */}
    </>
  );
};
export default TableCell;
