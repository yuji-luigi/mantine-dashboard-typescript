import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Button, createStyles } from '@mantine/core';
import { sectionData, sections } from '../../data';
import { CrudDrawerDefault } from '../../components/drawer/CrudDrawerDefault';

const useStyles = createStyles(() => ({
  // sectionHeader: { display: 'flex', alignItems: 'center' },
  button: {
    paddingInline: '10px',
  },
}));

export function TableSectionHeader() {
  /** define open state for crudDrawer component */
  const [opened, setOpened] = useState(false);
  /** use style defined above */
  const { classes } = useStyles();
  /** get url string by useRouter */
  const { query, pathname } = useRouter();

  /** get entity from url using useRouter().query */
  const entity = query.entity as Sections;
console.log(entity)
  /**
   *  getSection json data to show the page headings  sectionData is array of objects 
   *  so find by data.slice === entity. 
   *  maybe slice rename to entity
  */
  let section = sectionData.find(data => data.slice === entity)
  section = !section && pathname === '/dashboard/home' 
  ? sectionData.find(data => data.slice ===' home') : section;


/** define case when theres no entity, 
 * seem like gives an error in other component
 */
  if (!section) {
    return <p>loading...</p>;
  }
/** define openDrawer function. Button onClick openDrawer */
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
