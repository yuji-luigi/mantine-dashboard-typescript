import React from 'react';
import useAuth from '../../hooks/useAuth';
import { Divider, Stack, Text } from '@mantine/core';

const ChooseRootSpacePage = () => {
  const { user } = useAuth();
  return (
    <Stack>
      <Text>ChooseRootSpacePage</Text>
      <Divider />
      <Text>user: {JSON.stringify(user, null, 2)}</Text>
    </Stack>
  );
};

export default ChooseRootSpacePage;
