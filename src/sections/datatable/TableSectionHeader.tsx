import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Button, createStyles } from '@mantine/core';
import { sectionData } from '../../data';
import { CrudDrawerDefault } from '../../components/drawer/CrudDrawerDefault';

const useStyles = createStyles(() => ({
  // sectionHeader: { display: 'flex', alignItems: 'center' },
  button: {
    paddingInline: '10px',
  },
}));

export function TableSectionHeader() {
  const [opened, setOpened] = useState(false);
 sectionData as SectionDataJson;
  const { classes } = useStyles();
  const { query, pathname } = useRouter();
  const entity = query.entity as Sections;
  let section = sectionData[entity];
  section = !section && pathname === '/dashboard/home' ? sectionData.home : section;

  if (!section) {
    return <p>loading...</p>;
  }
  const openDrawer = () => setOpened(true);
  return (
    <div>
      <h2>{section.title}</h2>
      {section.createButton && (
        <Button onClick={openDrawer} className={classes.button}>
          <h3>{section.createButton}</h3>
        </Button>
      )}
      <CrudDrawerDefault opened={opened} setOpened={setOpened} />
    </div>
  );
}
