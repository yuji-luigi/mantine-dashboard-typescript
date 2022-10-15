import React from 'react';
import { useRouter } from 'next/router';
import { Button, Container, createStyles } from '@mantine/core';
import sectionData from '../../../data/datatable/section/sectionData.json';
import { SectionDataJson, Sections } from '../../types/general/data/datatable/sections-json';

sectionData as SectionDataJson;

const useStyles = createStyles(() => ({
  sectionHeader: { display: 'flex', alignItems: 'center' },
}));

export function SectionHeader() {
  const { classes } = useStyles();
  const { query, pathname } = useRouter();

  let section = sectionData[query.entity as Sections];
  section = !section && pathname === '/dashboard/home' ? sectionData.home : section;

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
