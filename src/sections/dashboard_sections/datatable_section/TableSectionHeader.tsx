import { useRouter } from 'next/router';
import { Button, createStyles } from '@mantine/core';
import { useEffect } from 'react';
import { sectionData } from '../../../data';
import { useDrawerContext } from '../../../context/DataTableDrawerContext';
import { BreadcrumbsCustom } from './BreadcrumbsCustom';
import useLayoutContext from '../../../../hooks/useLayoutContext';
import { useCrudSliceStore } from '../../../redux/features/crud/crudSlice';
import { API_PATH } from '../../../path/api-routes';
import axiosInstance from '../../../utils/axios-instance';

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
function instanceOfParentDataInterface(object: any): object is ParentDataInterface {
  return 'name' in object;
}
export function TableSectionHeader({ entityOverride = '' }: { entityOverride?: Sections | '' }) {
  /** define open state for crudDrawer component */

  const { openDrawer } = useDrawerContext();

  const { selectCrudDocument } = useCrudSliceStore();

  const { setBreadcrumbs, breadcrumbs, setPrevBreadcrumbs, parentData } = useLayoutContext();

  /** use style defined above */
  const { classes } = useStyles();
  /** get url string by useRouter */
  const { query }: { query: ParsedQueryCustom } = useRouter();

  /** get entity from url using useRouter().query */
  let { entity } = query;
  entity = entityOverride || entity; // if entityOverride is present entity is set to override one

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
    /** entity is possibly null */
    if (entity) {
      const regex = /^\w/;
      const title = entity.replace(regex, (c) => c.toUpperCase());
      /** TODO: fix hardcoded /dashboard */
      setBreadcrumbs({ title, href: `/dashboard/${entity}` });
      setPrevBreadcrumbs(breadcrumbs);
    }
    /** if null is passed set to [] in condition. */
    return () => setBreadcrumbs(null);
  }, [query.entity]);

  /** define case when theres no entity,
   * seem like gives an error in other component
   */
  if (!section) {
    return <p>loading...</p>;
  }
  /** define openDrawer function. Button onClick openDrawer */

  function handleOpenDrawer() {
    if (typeof entity !== 'undefined') {
      selectCrudDocument({ entity, document: null });
    }
    openDrawer();
  }

  let { title } = section;
  if (query.parentId && instanceOfParentDataInterface(parentData)) {
    title = parentData.name;
  }

  const deleteAllUploads = async () => {
    console.log('delete all uploads');
    await axiosInstance.delete(`${API_PATH.uploads}/delete-all`);
  };

  return (
    <div>
      <div className={classes.headerWrapper}>
        <div>
          <h1 className={classes.title}>{title}</h1>
          <BreadcrumbsCustom />
        </div>
        {section.createButton && (
          <Button onClick={handleOpenDrawer} className={classes.button}>
            <h3>{section.createButton}</h3>
          </Button>
        )}
        {query.entity === 'uploads' && (
          <Button color="red" onClick={deleteAllUploads} className={classes.button}>
            <h3>Delete All!!</h3>
          </Button>
        )}
      </div>
      {/* <CrudDrawerDefault /> */}
    </div>
  );
}
