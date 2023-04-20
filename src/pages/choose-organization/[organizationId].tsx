import React, { ReactElement } from 'react';
import axiosInstance, { AxiosResData, AxiosResDataGeneric } from '../../utils/axios-instance';
import { PATH_API } from '../../path/api-routes';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { AxiosError } from 'axios';
import Layout from '../../layouts';

import { CardArticleVerticalTextCenter } from '../../components/card/CardVerticalTextCenter';
import {
  CardArticleVerticalTextBottom,
  CardData,
} from '../../components/card/CardVerticalTextBottom';
import { PATH_DASHBOARD } from '../../path/page-paths';
import { Box, Button, Divider, Group, Stack, createStyles, Text } from '@mantine/core';
import useAuth from '../../../hooks/useAuth';
import Link from 'next/link';
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
const fetchSpaces = async (organizationId: string) => {
  if (!organizationId) return null;
  const rawSpaces = await axiosInstance.get<AxiosResDataGeneric<SpaceModel[]>>(PATH_API.spaces, {
    params: { organization: organizationId, isHead: true },
  });
  return rawSpaces.data?.data;
};

const ChooseSpaceInOrganizationPage = () => {
  const router = useRouter();
  const { user } = useAuth();
  const { classes, cx, theme } = useStyles();

  const {
    data: spaces,
    error,
    isLoading,
  } = useSWR<SpaceModel[] | null, AxiosError>(router.query.organizationId, fetchSpaces);
  if (!spaces) return <p>loading...</p>;
  return (
    <Stack>
      <Group position="apart" align="center" pt={16}>
        <Text variant="text" size={36} weight={600} align="center">
          Choose a space
        </Text>
      </Group>
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

        {spaces.map((rootSpace) => (
          <CardArticleVerticalTextBottom
            data={rootSpace as CardData}
            href={`${PATH_DASHBOARD.rootSpaceSelected}/${rootSpace._id}`}
          />
        ))}
      </Box>
    </Stack>
  );
};

ChooseSpaceInOrganizationPage.getLayout = (page: ReactElement) => {
  return <Layout variant="main">{page}</Layout>;
};

export default ChooseSpaceInOrganizationPage;
