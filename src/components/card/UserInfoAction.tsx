import { Avatar, Text, Button, Paper } from '@mantine/core';

interface UserInfoActionProps {
  avatar: string;
  name: string;
  email: string;
  job: string;
}

export function UserInfoAction({ user }: { user: UserModel }) {
  return (
    <Paper
      radius="md"
      withBorder
      p="lg"
      sx={(theme) => ({
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
      })}
    >
      <Avatar src={user.avatar?.url || ''} size={120} radius={120} mx="auto" />
      <Text ta="center" fz="lg" weight={500} mt="md">
        {user.name}
      </Text>
      <Text ta="center" c="dimmed" fz="sm">
        {user.email} • {user.role}
      </Text>

      <Button variant="default" fullWidth mt="md">
        Send message
      </Button>
    </Paper>
  );
}
