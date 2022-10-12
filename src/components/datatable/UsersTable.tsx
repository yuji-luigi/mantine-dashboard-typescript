import {
  Avatar,
  Badge,
  Table,
  Group,
  Text,
  ActionIcon,
  Anchor,
  ScrollArea,
  useMantineTheme,
  Pagination,
} from '@mantine/core';
import { IconPencil, IconTrash } from '@tabler/icons';
import { useState } from 'react';

import users from '../../../data/mock/usersDatatable.json';

interface UsersTableProps {
  data: { avatar: string; name: string; job: string; email: string; phone: string }[];
}

const jobColors: Record<string, string> = {
  engineer: 'blue',
  manager: 'cyan',
  designer: 'pink',
};

export function UsersTable({ data }: UsersTableProps) {
  const theme = useMantineTheme();
  const rows = data.map((item, i) => (
    <tr key={i}>
      <td>
        <Group spacing="sm">
          <Avatar size={30} src={item.avatar} radius={30} />
          <Text size="sm" weight={500}>
            {item.name}
          </Text>
        </Group>
      </td>

      <td>
        <Badge
          color={jobColors[item.job.toLowerCase()]}
          variant={theme.colorScheme === 'dark' ? 'light' : 'outline'}
        >
          {item.job}
        </Badge>
      </td>
      <td>
        <Anchor<'a'> size="sm" href="#" onClick={(event) => event.preventDefault()}>
          {item.email}
        </Anchor>
      </td>
      <td>
        <Text size="sm" color="dimmed">
          {item.phone}
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
    </tr>
  ));
  const ROWS_PER_PAGE = 5;
  const TOTAL = Math.ceil(users.length / ROWS_PER_PAGE);
  const [page, setPage] = useState(1);
  console.log(page);
  return (
    <>
      <ScrollArea>
        <Table sx={{ minWidth: 800 }} verticalSpacing="sm">
          <thead>
            <tr>
              <th>Employee</th>
              <th>Job title</th>
              <th>Email</th>
              <th>Phone</th>
              <th />
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </ScrollArea>
      <Pagination page={page} onChange={setPage} total={TOTAL} />
    </>
  );
}
