import React, { ReactElement } from 'react';
import useAuth from '../../hooks/useAuth';
import { Box, Button, Divider, Group, Stack, Text, createStyles } from '@mantine/core';
import { CardArticleVerticalTextBottom, CardData } from '../components/card/CardVerticalTextBottom';
import { CARD_LINK_PATH, PATH_DASHBOARD } from '../path/page-paths';
import axiosInstance from '../utils/axios-instance';
import { PATH_API } from '../path/api-routes';

import useSWR from 'swr';
import { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '../layouts';
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

const fetchSpaceSelections = async (user: UserModel) => {
  if (!user) return null;
  const res = await axiosInstance.get(PATH_API.getSpaceSelections);
  return res.data?.data;
};

const ChooseRootSpacePage = () => {
  const { user } = useAuth();
  const { classes, cx, theme } = useStyles();
  const router = useRouter();

  const title = user?.role === 'super_admin' ? 'Choose organization' : 'Choose space';
  const hrefRoot = CARD_LINK_PATH.rootSpaceSelected;
  const {
    data: rootSpaces,
    error,
    isLoading,
  } = useSWR<SpaceModel[] | null, AxiosError>(user, fetchSpaceSelections);

  if (user?.role === 'super_admin') {
    router.push(PATH_DASHBOARD.chooseOrganization);
    return null;
  }
  if (!rootSpaces || isLoading) return <p>loading</p>;

  const handleSpaceSelected = async (spaceId: string) => {
    await axiosInstance.get(`${PATH_API.spaceCookie}/${spaceId}`);
    router.push(PATH_DASHBOARD.root);
  };

  return (
    <Stack>
      <Group position="apart" align="center" pt={16}>
        <Text variant="text" size={36} weight={600} align="center">
          {title}
        </Text>
        <Button component={Link} href={PATH_DASHBOARD.logout}>
          logout
        </Button>
      </Group>
      <Divider />

      <Box
        className={classes.pinContainer}
        py="xl" /* cols={2} breakpoints={[{ maxWidth: 'sm', cols: 1 }]} */
      >
        {rootSpaces.map((rootSpace) => (
          <CardArticleVerticalTextBottom
            key={rootSpace._id}
            data={rootSpace as CardData}
            onClick={() => handleSpaceSelected(rootSpace._id)}
            // href={`${hrefRoot}/${rootSpace._id}`}
          />
        ))}
      </Box>
    </Stack>
  );
};

ChooseRootSpacePage.getLayout = (page: ReactElement) => <Layout variant="main">{page}</Layout>;

// export async function getServerSideProps(context: GetServerSidePropsContext) {
//   const jwtToken = context.req.cookies.jwt;
//   const res = await axiosInstance.get<AxiosResDataMeResponse<UserModel>>(`${PATH_AUTH.me}`, {
//     headers: {
//       Authorization: `Bearer ${jwtToken}`,
//       // 'Content-Type': 'application/x-www-form-urlencoded',
//     },
//   });

//   const user = res.data.user;

//   if (user?.role === 'super_admin') {
//     return {
//       redirect: {
//         destination: '/choose-organization',
//         permanent: false,
//       },
//     };
//   }

//   // get space of the user
//   const rootSpaces = await axiosInstance.get(`${PATH_API.getSpaceSelections}/`, {
//     headers: {
//       Authorization: `Bearer ${jwtToken}`,
//       // 'Content-Type': 'application/x-www-form-urlencoded',
//     },
//     params,
//     // params: { $in: [...user?.rootSpaces, '$_id'] },
//     // params: { _id: { $in: user?.rootSpaces } },
//     // params: { _id: user?.rootSpaces },
//   });

//   return { props: { rootSpaces: rootSpaces.data.data || [] } };
// }

export default ChooseRootSpacePage;
