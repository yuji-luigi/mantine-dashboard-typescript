import React from 'react';
import { Group, Avatar, Text } from '@mantine/core';
// import { IconPencil, IconTrash } from '@tabler/icons';
// import { UsersTableRow } from '../../../../types/general/data/datatable/objects';
import { FieldTypes } from '../../../../../json/dataTable/formfields';
export const jobColors: Record<string, string> = {
  engineer: 'blue',
  manager: 'cyan',
  designer: 'pink',
};

const TableCell = ({
  cellData,
  cellConfig,
}: {
  cellData: string;
  cellConfig: FormFieldInterface;
}) => {
  // const theme = useMantineTheme();
  // if (cellConfig.badge) {
  //   return (
  //     <td>
  //       <td>
  //         <Badge
  //           color={jobColors[cellData.job.toLowerCase()]}
  //           variant={theme.colorScheme === 'dark' ? 'light' : 'outline'}
  //         >
  //           {cellData.job}
  //         </Badge>
  //       </td>
  //     </td>
  //   );
  // }
  if (cellConfig.noTable) {
    return null;
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
          <Text size="lg" weight={500}>
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
