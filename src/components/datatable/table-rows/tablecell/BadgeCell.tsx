import { Badge } from '@mantine/core';
import React, { ReactNode } from 'react';

const BadgeCell = ({ children }: { children: ReactNode }) => {
  console.log('style in badgecell.');
  return <Badge>{children}</Badge>;
};
export default BadgeCell;
