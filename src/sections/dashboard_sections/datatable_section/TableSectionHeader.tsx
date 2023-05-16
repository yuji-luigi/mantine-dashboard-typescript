import { useRouter } from 'next/router';
import { Box, Button, Group, Stack, Sx, createStyles } from '@mantine/core';
import { useEffect } from 'react';
import { sectionData } from '../../../data';
import { useDrawerContext } from '../../../context/DataTableDrawerContext';
import { BreadcrumbsCustom } from './BreadcrumbsCustom';
import useLayoutContext from '../../../../hooks/useLayoutContext';
import { useCrudSliceStore } from '../../../redux/features/crud/crudSlice';
import { PATH_API } from '../../../path/api-routes';
import axiosInstance from '../../../utils/axios-instance';
import { Sections } from '../../../types/general/data/sections-type';

const useStyles = createStyles(() => ({
  headerWrapper: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'end',
    justifyContent: 'space-between',
    // paddingInline: 10,
    paddingTop: 30,
    // paddingInline: 32,
  },
  title: {
    marginBlock: 5,
  },
  button: {
    minWidth: 150,
    // marginLeft: 40,
  },
}));
function instanceOfParentDataInterface(object: any): object is ParentDataInterface {
  return 'name' in object;
}
export function TableSectionHeader({
  overridingEntity = '',
  sx = {},
  children,
}: {
  sx?: Sx;
  overridingEntity?: Sections | '';
  children?: React.ReactNode;
}) {
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
  entity = overridingEntity || entity; // if overridingEntity is present entity is set to override one

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
      const title = entity.replace(regex, (c: string) => c.toUpperCase());
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
    await axiosInstance.delete(`${PATH_API.uploads}/delete-all`);
  };

  return (
    <Box px={40}>
      <Group className={classes.headerWrapper} sx={sx}>
        {/* <div > */}
        <Stack>
          <h1 className={classes.title}>{title}</h1>
          <BreadcrumbsCustom />
        </Stack>
        {section.createButton && (
          <Button onClick={handleOpenDrawer} className={classes.button}>
            <h3>{section.createButton}</h3>
          </Button>
        )}
        {/* {query.entity === 'uploads' && (
        <Button color="red" onClick={deleteAllUploads} className={classes.button}>
          <h3>Delete All!!</h3>
        </Button>
      )} */}
        {/* </div> */}
        {/* <CrudDrawerDefault /> */}
      </Group>
      {children}
    </Box>
  );
}
