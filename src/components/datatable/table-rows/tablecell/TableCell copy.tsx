import React from 'react';
import { Group, Avatar, Text, Badge, Anchor, ActionIcon, useMantineTheme } from '@mantine/core';
import { IconPencil, IconTrash } from '@tabler/icons';
import { UsersTableRow } from '../../../../types/general/data/datatable/objects';
import { FieldTypes } from '../../../../../data/datatable/formFields';
import { FormField } from '../../../../types/general/data/datatable/sections-json';

export const jobColors: Record<string, string> = {
  engineer: 'blue',
  manager: 'cyan',
  designer: 'pink',
};

const TableCell = ({ rowData, cellConfig }: { rowData: UsersTableRow; cellConfig: FormField }) => {
  const theme = useMantineTheme();
  // if (cellConfig.badge) {
  //   return (
  //     <td>
  //       <td>
  //         <Badge
  //           color={jobColors[rowData.job.toLowerCase()]}
  //           variant={theme.colorScheme === 'dark' ? 'light' : 'outline'}
  //         >
  //           {rowData.job}
  //         </Badge>
  //       </td>
  //     </td>
  //   );
  // }

  return (
    <>
      {cellConfig.type === FieldTypes.Avatar && (
        <td>
          <Group spacing="xs">
            <Avatar size={40} src={rowData.avatar} radius={30} />
          </Group>
        </td>
      )}

      <td>
        <Badge
          color={jobColors[rowData.job.toLowerCase()]}
          variant={theme.colorScheme === 'dark' ? 'light' : 'outline'}
        >
          {rowData.job}
        </Badge>
      </td>
      <td>
        <Anchor<'a'> size="sm" href="#" onClick={(event) => event.preventDefault()}>
          {rowData.email}
        </Anchor>
      </td>
      <td>
        <Text size="sm" color="dimmed">
          {rowData.phone}
        </Text>
      </td>
      <td>
        <Group spacing={0} position="right">
          <ActionIcon>
            <IconPencil size={16} stroke={1.5} />
          </ActionIcon>
          <ActionIcon color="red">
            <IconTrash size={16} stroke={1.5} />
          </ActionIcon>
        </Group>
      </td>
    </>
  );
};

export default TableCell;
