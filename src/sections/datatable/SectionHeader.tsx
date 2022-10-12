import React from 'react';
import { useRouter } from 'next/router';
import { Button, Container, createStyles } from '@mantine/core';
import sectionData from '../../../data/datatable/section/sectionData.json';

sectionData as SectionDataJson;

const useStyles = createStyles(() => ({
  sectionHeader: { display: 'flex', alignItems: 'center' },
}));

export function SectionHeader() {
  const { classes } = useStyles();
  const { query } = useRouter();
  const section = sectionData[query.entity as Sections];
  if (!section) {
    return <p>loading...</p>;
  }
  return (
    <Container className={classes.sectionHeader}>
      <h3>{section.title}</h3>
      {section.createButton && <Button>create button</Button>}
    </Container>
  );
}
