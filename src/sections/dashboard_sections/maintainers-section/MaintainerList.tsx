import React from 'react';
import { CardMaintainer } from '../../../components/card/CardMaintainer';
import { Box, createStyles } from '@mantine/core';
import { PATH_IMAGE } from '../../../lib/image-paths';
import { Sections } from '../../../types/general/data/sections-type';
import { useCrudSelectors } from '../../../redux/features/crud/crudSlice';

/**
 * 1. fetch all the maintainers from database with redux.
 * 2. display all the maintainers in a card grid.
 * 3. has filter and search bar.
 *
 * card has
 * 1. avatar
 * 2. name
 * 3. company name
 * 4. email
 * 5. phone
 * 6. address
 *
 *
 *
 * @returns
 */

const useStyles = createStyles((theme) => ({
  pinContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, 300px)',
    gridAutoRows: 'minmax(50px, auto)',
    justifyContent: 'center',
    gap: 24,
  },
}));

const MaintainerList = ({ entity }: { entity: Sections }) => {
  const { classes, cx, theme } = useStyles();

  const { crudDocuments } = useCrudSelectors(entity);

  return (
    <>
      <Box
        className={classes.pinContainer}
        py="xl" /* cols={2} breakpoints={[{ maxWidth: 'sm', cols: 1 }]} */
      >
        {crudDocuments.map((_, i) => (
          <CardMaintainer entity={entity} maintainer={_} key={i} />
        ))}
      </Box>
    </>
  );
};

export default MaintainerList;
