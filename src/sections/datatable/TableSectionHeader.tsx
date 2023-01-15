import { useRouter } from 'next/router';
import { Button, createStyles } from '@mantine/core';
import { useEffect } from 'react';
import { sectionData } from '../../data';
import { CrudDrawerDefault } from '../../components/drawer/CrudDrawerDefault';
import { useDrawerContext } from '../../context/DataTableDrawerContext';
import { BreadcrumbsCustom } from './BreadcrumbsCustom';
import useLayoutContext from '../../../hooks/useLayoutContext';

const useStyles = createStyles(() => ({
  headerWrapper: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingInline: 10,
    paddingTop: 30,
  },
  title: {
    marginBlock: 5,
  },
  button: {
    marginLeft: 40,
  },
}));

export function TableSectionHeader({ entityOverride = '' }: { entityOverride?: Sections }) {
  /** define open state for crudDrawer component */

  const { openDrawer } = useDrawerContext();

  const { setBreadcrumbs, breadcrumbs, setPrevBreadcrumbs } = useLayoutContext();

  /** use style defined above */
  const { classes } = useStyles();
  /** get url string by useRouter */
  const { query /* pathname */ } = useRouter();

  /** get entity from url using useRouter().query */
  let entity = query.entity as Sections;
  entity = entityOverride || entity;
  /**
   *  getSection json data to show the page headings  sectionData is array of objects
   *  so find by data.slice === entity.
   *  maybe slice rename to entity
   */
  const flattenSectionData = sectionData.flatMap((data) =>
    data.contents.flatMap((content) => content)
  );
  const section = flattenSectionData.find((data) => data.entity === entity);

  useEffect(() => {
    const regex = /^\w/;
    const title = entity.replace(regex, (c) => c.toUpperCase());
    setBreadcrumbs({ title, href: `${entity}` });
    setPrevBreadcrumbs(breadcrumbs);

    return () => {
      setBreadcrumbs(null);
    };
  }, [query.entity]);

  /** define case when theres no entity,
   * seem like gives an error in other component
   */
  if (!section) {
    return <p>loading...</p>;
  }
  /** define openDrawer function. Button onClick openDrawer */

  return (
    <div>
      <div className={classes.headerWrapper}>
        <div>
          <h1 className={classes.title}>{section.title}</h1>
          <BreadcrumbsCustom />
        </div>
        {section.createButton && (
          <Button onClick={openDrawer} className={classes.button}>
            <h3>{section.createButton}</h3>
          </Button>
        )}
      </div>
      <CrudDrawerDefault />
    </div>
  );
}
