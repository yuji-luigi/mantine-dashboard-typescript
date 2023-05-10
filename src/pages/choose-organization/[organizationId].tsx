import React, { ReactElement, useEffect } from 'react';
import axiosInstance, { AxiosResData, AxiosResDataGeneric } from '../../utils/axios-instance';
import { PATH_API } from '../../path/api-routes';
import { NextRouter, useRouter } from 'next/router';
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
import { useCookieContext } from '../../context/CookieContext';
const useStyles = createStyles((theme) => ({
  pinContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, 400px)',
    gridAutoRows: 'minmax(50px, auto)',
    justifyContent: 'center',
    gap: 10,
  },
}));
const fetchSpaces = async (organizationId: string) => {
  if (!organizationId) return null;
  console.log(organizationId);
  const res = await axiosInstance.get(`${PATH_API.organizationCookie}/${organizationId}`);
  return res.data.data;
};

const ChooseSpaceInOrganizationPage = () => {
  const router: NextRouter & { query: ParsedQueryCustom; pathname: string } = useRouter();
  const { user } = useAuth();
  const { classes, cx, theme } = useStyles();
  const { setCurrentOrganization } = useCookieContext();

  useEffect(() => {
    if (router.query.organizationId) {
      setCurrentOrganization(router.query.organizationId);
    }
  }, []);

  const { data: spaces } = useSWR<SpaceModel[] | null, AxiosError>(
    router.query.organizationId,
    fetchSpaces
  );
  const { data, error, isLoading } = useSWR<SpaceModel[] | null, AxiosError>(
    router.query.organizationId,
    fetchSpaces
  );
  const handleSpaceSelected = async (spaceId: string) => {
    await axiosInstance.get(`${PATH_API.spaceCookie}/${spaceId}`);
    router.push(PATH_DASHBOARD.root);
  };
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
            data={{
              href: PATH_DASHBOARD.chooseOrganization,
              _id: '',
              name: 'Back',
              address: '',
              createdAt: '',
            }}
          />
        )}

        {spaces.map((rootSpace) => (
          <CardArticleVerticalTextBottom
            data={rootSpace as CardData}
            onClick={() => handleSpaceSelected(rootSpace._id)}
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
