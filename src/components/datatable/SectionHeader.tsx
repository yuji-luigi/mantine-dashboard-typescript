import React from 'react';
import { Button, Container, createStyles } from '@mantine/core';

const useStyles = createStyles(() => ({
  sectionHeader: { display: 'flex', alignItems: 'center' },
}));

export function SectionHeader({ entity }: { entity: string }) {
  const { classes } = useStyles();
  return (
    <Container className={classes.sectionHeader}>
      <h1>{entity}</h1>
      <h3>subtitle</h3>
      <Button>create button</Button>
    </Container>
  );
}
