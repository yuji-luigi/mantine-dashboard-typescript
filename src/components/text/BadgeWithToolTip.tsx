import { Badge, Text, Box, useMantineTheme, Tooltip } from '@mantine/core';
import React, { use } from 'react';
import { Icons } from '../../data/icons';

const BadgeWithToolTip = ({
  icon,
  text,
  disabled,
}: {
  icon: JSX.Element;
  text: string;
  disabled?: boolean;
}) => {
  const theme = useMantineTheme();
  const dark = theme.colorScheme === 'dark';
  return (
    <Tooltip
      disabled={disabled}
      label={text}
      withArrow
      multiline
      // width={220}
    >
      <Badge sx={{ cursor: 'pointer', paddingBlock: 16 }}>
        <Text color={dark ? '' : 'black'} truncate weight={300}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box mr={4}>{icon}</Box>
            {text}
          </Box>
        </Text>
      </Badge>
    </Tooltip>
  );
};

export default BadgeWithToolTip;
