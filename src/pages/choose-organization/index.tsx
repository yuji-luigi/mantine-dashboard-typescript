import React, { ReactElement, useEffect } from 'react';
import useAuth from '../../../hooks/useAuth';
import { Box, Divider, Stack, Text, createStyles } from '@mantine/core';
import PostList from '../../sections/posts_list_section/PostList';
import {
  CardArticleVerticalTextBottom,
  CardData,
} from '../../components/card/CardVerticalTextBottom';
import { CARD_LINK_PATH, PATH_DASHBOARD } from '../../path/page-paths';
import axiosInstance from '../../utils/axios-instance';
import { PATH_API } from '../../path/api-routes';
import { CardArticleVerticalTextCenter } from '../../components/card/CardVerticalTextCenter';
import { useRouter } from 'next/router';
import Layout from '../../layouts';

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
const ChooseOrganizationPage = () => {
  const { user } = useAuth();
  const [organizations, setOrganizations] = React.useState<OrganizationModel[] | SpaceModel[]>([]);
  const { classes, cx, theme } = useStyles();
  const router = useRouter();

  useEffect(() => {
    if (user?.role !== 'super_admin') {
      router.push(PATH_DASHBOARD.chooseRootSpace);
      return;
    }

    axiosInstance.get(`${PATH_API.getOrganizationsForAdmin}`).then((res) => {
      setOrganizations(res.data.data);
    });
  }, [user?.role]);

  const title = user?.role === 'super_admin' ? 'Choose organization' : 'Choose space';
  const hrefRoot = PATH_DASHBOARD.chooseOrganization;

  if (user?.role !== 'super_admin') {
    return null;
  }

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
            data={{
              href: PATH_DASHBOARD.root,
              _id: '',
              name: ' Browse all organizations',
              address: '',
              createdAt: '',
            }}
          />
        )}

        {organizations.map((organization) => (
          <CardArticleVerticalTextBottom
            key={organization._id}
            data={organization as CardData}
            href={`${hrefRoot}/${organization._id}`}
          />
        ))}
      </Box>
    </Stack>
  );
};
ChooseOrganizationPage.getLayout = (page: ReactElement) => <Layout variant="main">{page}</Layout>;
export default ChooseOrganizationPage;
