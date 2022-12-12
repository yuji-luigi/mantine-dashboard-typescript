import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Button, createStyles } from '@mantine/core';
import { sectionData, sections } from '../../data';
import { CrudDrawerDefault } from '../../components/drawer/CrudDrawerDefault';

const useStyles = createStyles(() => ({
  // sectionHeader: { display: 'flex', alignItems: 'center' },
  headerWrapper: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    // marginBottom: 20,
    paddingInline: 10,
  },
  title: {
    justifySelf: 'start',
  },
  button: {
    paddingInline: '10px',
    // alignSelf: 'end',
  },
}));

export function TableSectionHeader({ entityOverride = '' }: { entityOverride?: Sections }) {
  /** define open state for crudDrawer component */
  const [opened, setOpened] = useState(false);
  /** use style defined above */
  const { classes } = useStyles();
  /** get url string by useRouter */
  const { query, pathname } = useRouter();

  /** get entity from url using useRouter().query */
  let entity = query.entity as Sections;
  entity = entityOverride ? entityOverride : entity;
  /**
   *  getSection json data to show the page headings  sectionData is array of objects
   *  so find by data.slice === entity.
   *  maybe slice rename to entity
   */
  const flattenSectionData = sectionData.flatMap((data) =>
    data.contents.flatMap((content) => content)
  );
  let section = flattenSectionData.find((data) => data.entity === entity);
  // section =
  //   !section && pathname === '/dashboard/home'
  //     ? sectionData.find((data) => data.slice === ' home')
  //     : section;

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
      <div className={classes.headerWrapper}>
        <h1 className={classes.title}>{section.title}</h1>
        {section.createButton && (
          <Button onClick={openDrawer} className={classes.button}>
            <h3>{section.createButton}</h3>
          </Button>
        )}
      </div>
      <CrudDrawerDefault opened={opened} setOpened={setOpened} />
    </div>
  );
}
