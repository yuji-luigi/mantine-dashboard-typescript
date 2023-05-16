import React from 'react';
import { CardMaintainer } from '../../../components/card/CardMaintainer';
import { Box, createStyles } from '@mantine/core';
import { PATH_IMAGE } from '../../../lib/image-paths';

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

const mario: MaintainerModel = {
  name: 'Mario Nintendo',
  company: 'Hydric Nintendo',
  avatar: { url: PATH_IMAGE.flatmateLogo1 } as UploadModel,
  homepage: 'https://mantine.dev',
  type: 'plumber',
  tel: '+39-123-456-7890',
  email: 'u.ji.jp777@gmail.com',
  logo: PATH_IMAGE.faviconsvg,
  description:
    'lorem ipsum dolor sit ametlorem ipsum dolor sit ametlorem ipsum dolor sit ametlorem ipsum dolor sit ametlorem ipsum dolor sit ametlorem ipsum dolor sit ametlorem ipsum dolor sit ametlorem ipsum dolor sit ametlorem ipsum dolor sit ametlorem ipsum dolor sit ametlorem ipsum dolor sit ametlorem ipsum dolor sit ametlorem ipsum dolor sit ametlorem ipsum dolor sit ametlorem ipsum dolor sit ametlorem ipsum dolor sit ametlorem ipsum dolor sit ametlorem ipsum dolor sit ametlorem ipsum dolor sit ametlorem ipsum dolor sit ametlorem ipsum dolor sit ametlorem ipsum dolor sit ametlorem ipsum dolor sit ametlorem ipsum dolor sit ametlorem ipsum dolor sit ametlorem ipsum dolor sit ametlorem ipsum dolor sit ametlorem ipsum dolor sit ametlorem ipsum dolor sit ametlorem ipsum dolor sit ametlorem ipsum dolor sit ametlorem ipsum dolor sit ametlorem ipsum dolor sit ametlorem ipsum dolor sit ametlorem ipsum dolor sit ametlorem ipsum dolor sit ametlorem ipsum dolor sit ametlorem ipsum dolor sit ametlorem ipsum dolor sit ametlorem ipsum dolor sit ametlorem ipsum dolor sit ametlorem ipsum dolor sit ametlorem ipsum dolor sit amet',
  address: 'via roma 1, 00100, roma, italia',
  isIndividual: false,
  createdBy: {},
  _id: 'jaoighar',
  createdAt: Date.now().toString(),
  updatedAt: Date.now().toString(),
};
const MaintainerList = () => {
  const { classes, cx, theme } = useStyles();

  return (
    <>
      <Box
        className={classes.pinContainer}
        py="xl" /* cols={2} breakpoints={[{ maxWidth: 'sm', cols: 1 }]} */
      >
        {[...Array(10)].map((_, i) => (
          <CardMaintainer maintainer={mario} key={i} />
        ))}
        )]
      </Box>
    </>
  );
};

export default MaintainerList;
