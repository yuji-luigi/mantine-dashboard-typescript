import React, { useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import { Box, Divider, Stack, Text, createStyles } from '@mantine/core';
import PostList from '../sections/posts_list_section/PostList';
import { CardArticleVerticalTextBottom, CardData } from '../components/card/CardVerticalTextBottom';
import { CARD_LINK_PATH, PATH_DASHBOARD } from '../path/page-paths';
import axiosInstance, {
  AxiosResData,
  AxiosResDataGeneric,
  AxiosResDataMeResponse,
} from '../utils/axios-instance';
import { PATH_API } from '../path/api-routes';
import { CardArticleVerticalTextCenter } from '../components/card/CardVerticalTextCenter';
import { GetServerSidePropsContext } from 'next/types';
import { PATH_AUTH } from '../path/api-routes';

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

  const title = user?.role === 'super_admin' ? 'Choose organization' : 'Choose space';
  const hrefRoot = CARD_LINK_PATH.rootSpaceSelected;

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
          <CardArticleVerticalTextBottom
            data={rootSpace as CardData}
            href={`${hrefRoot}/${rootSpace._id}`}
          />
        ))}
      </Box>
    </Stack>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const jwtToken = context.req.cookies.jwt;
  const res = await axiosInstance.get<AxiosResDataMeResponse<UserModel>>(`${PATH_AUTH.me}`, {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
  });

  const user = res.data.user;

  if (user?.role === 'super_admin') {
    return {
      redirect: {
        destination: '/choose-organization',
        permanent: false,
      },
    };
  }

  // get space of the user
  const rootSpaces = await axiosInstance.get(`${PATH_API.spaces}`, {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    // params: { _id: { $in: user?.rootSpaces } },
    params: { _id: user?.rootSpaces },
  });

  return { props: { rootSpaces: rootSpaces.data.data || [] } };
}

export default ChooseRootSpacePage;
