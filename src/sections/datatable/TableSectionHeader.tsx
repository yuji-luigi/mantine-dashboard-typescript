import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Button, createStyles } from '@mantine/core';
import { Sections } from '../../types/general/data/dataTable/sections-json';
import { sectionData } from '../../data';
import { DrawerDefault } from '../../components/drawer/DrawerDefault';

const useStyles = createStyles(() => ({
  // sectionHeader: { display: 'flex', alignItems: 'center' },
  button: {
    paddingInline: '10px',
  },
}));

export function TableSectionHeader() {
  const [opened, setOpened] = useState(false);

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
      <DrawerDefault opened={opened} setOpened={setOpened} />
    </div>
  );
}
