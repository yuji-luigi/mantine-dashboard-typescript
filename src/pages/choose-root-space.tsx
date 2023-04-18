import React, { useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import { Box, Divider, Stack, Text, createStyles } from '@mantine/core';
import PostList from '../sections/posts_list_section/PostList';
import { CardArticleVerticalTextBottom, CardData } from '../components/card/CardVerticalTextBottom';
import { CARD_LINK_PATH, PATH_DASHBOARD } from '../path/page-paths';
import axiosInstance from '../utils/axios-instance';
import { PATH_API } from '../path/api-routes';
import { CardArticleVerticalTextCenter } from '../components/card/CardVerticalTextCenter';

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
  const [rootSpaces, setRootSpaces] = React.useState<OrganizationModel[] | SpaceModel[]>([]);
  const { classes, cx, theme } = useStyles();
  console.log(user?.role);
  useEffect(() => {
    if (user?.role === 'super_admin') {
      axiosInstance.get(`${PATH_API.getSpaceSelections}`).then((res) => {
        console.log(res.data.data);
        setRootSpaces(res.data.data);
      });
    }
  }, [user?.role]);

  const title = user?.role === 'super_admin' ? 'Choose organization' : 'Choose space';
  const hrefRoot =
    user?.role === 'super_admin'
      ? CARD_LINK_PATH.organizationSelected
      : CARD_LINK_PATH.rootSpaceSelected;
  console.log(user?.role);
  console.log(hrefRoot);
  return (
    <Stack>
      <Text variant="text" size={36} weight={600} align="center">
        {title}
      </Text>
      <Divider />

      <Box
        className={classes.pinContainer}
        py="xl" /* cols={2} breakpoints={[{ maxWidth: 'sm', cols: 1 }]} */
      >
        {user?.role === 'super_admin' && (
          <CardArticleVerticalTextCenter
            data={{ href: '/dashboard', _id: '', name: '', address: '', createdAt: '' }}
          />
        )}

        {rootSpaces.map((rootSpace) => (
          <CardArticleVerticalTextBottom data={rootSpace as CardData} hrefRoot={hrefRoot} />
        ))}
      </Box>
    </Stack>
  );
};

export default ChooseRootSpacePage;
