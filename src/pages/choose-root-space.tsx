import React from 'react';
import useAuth from '../../hooks/useAuth';
import { Box, Divider, Stack, Text, createStyles } from '@mantine/core';
import PostList from '../sections/posts_list_section/PostList';
import { CardArticleVertical } from '../components/card/CardVertical';
import { CARD_LINK_PATH, PATH_DASHBOARD } from '../path/page-paths';

const useStyles = createStyles((theme) => ({
  pinContainer: {
    // position: 'absolute',
    // width: '100%',
    // left: '50%',
    // transform: 'translateX(-50%)',
    display: 'grid',
    // gridTemplateColumns: 'repeat(auto-fit, minmax(400px, max-content))',
    gridTemplateColumns: 'repeat(auto-fill, 400px)',
    // gridAutoColumns: 'repeat(400px, minmax(400px, 1fr))',
    gridAutoRows: 'minmax(50px, auto)',
    justifyContent: 'center',
    gap: 10,
  },
}));
const ChooseRootSpacePage = () => {
  const { user } = useAuth();
  const { classes, cx, theme } = useStyles();

  return (
    <Stack>
      <Text>ChooseRootSpacePage</Text>
      <Divider />
      {/* <Text>user: {JSON.stringify(user, null, 2)}</Text> */}
      <Box
        className={classes.pinContainer}
        py="xl" /* cols={2} breakpoints={[{ maxWidth: 'sm', cols: 1 }]} */
      >
        {/* todo create Cards component where differentiate card by thread.type */}
        {user?.rootSpaces?.map((rootSpace) => (
          <CardArticleVertical
            data={rootSpace}
            // category={''}
            // title={''}
            // date={''}
            hrefRoot={CARD_LINK_PATH.rootSpaceSelected}
            author={{
              name: '',
              avatar: undefined,
            }}
          />
        ))}
      </Box>
    </Stack>
  );
};

export default ChooseRootSpacePage;
