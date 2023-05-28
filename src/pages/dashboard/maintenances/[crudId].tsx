import React from 'react';
import { IconBookmark, IconHeart, IconSettings, IconShare } from '@tabler/icons-react';
import {
  Card,
  Image,
  Text,
  ActionIcon,
  Badge,
  Group,
  Center,
  Avatar,
  createStyles,
  rem,
  Container,
  Stack,
  Box,
  Divider,
  Button,
} from '@mantine/core';
import { GetServerSidePropsContext } from 'next';
import axiosInstance from '../../../utils/axios-instance';
import { ReactElement } from 'react';
import Layout from '../../../layouts';
import CarouselBasic from '../../../components/carousel/CarouselBasic';
import useAuth from '../../../../hooks/useAuth';
import PostEditButton from '../../../components/posts/PostEditButton';
import SinglePostArticleArea from '../../../sections/single_maintenance_section/SingleMaintenanceArticleArea';
import RelatedArticlesArea from '../../../sections/single_maintenance_section/RelatedArticleArea';
import SingleMaintenanceHeading from '../../../sections/single_maintenance_section/SingleMaintenanceHeading';
import { CrudDrawerDefault } from '../../../components/drawer/CrudDrawerDefault';

const useStyles = createStyles((theme) => ({
  main: {
    minHeight: 'calc(100vh - 64px)',
  },

  articleMenuDivider: {
    marginBlock: theme.spacing.xl,
  },
}));

const MaintenancePage = ({ maintenance }: { maintenance: MaintenanceModel }) => {
  const { classes, cx, theme } = useStyles();
  return (
    <Container py="lg" className={classes.main}>
      <SingleMaintenanceHeading maintenance={maintenance} />
      <PostEditButton data={maintenance} entity="maintenances" />
      <SinglePostArticleArea maintenance={maintenance} />
      <Divider className={classes.articleMenuDivider} />
      <RelatedArticlesArea />
      <CrudDrawerDefault overridingEntity="maintenances" />
    </Container>
  );
};

MaintenancePage.getLayout = function getLayout(page: ReactElement) {
  return <Layout variant="dashboard">{page}</Layout>;
};
export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const jwtToken = context.req.cookies.jwt;
  try {
    const rawThread = await axiosInstance.get(
      `${process.env.NEXT_PUBLIC_API_URL}/maintenances/${context.query.crudId}`,
      {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          space: context.req.cookies.space || '',
          organization: context.req.cookies.organization || '',
        },
      }
    );

    const maintenance = rawThread.data.data;
    // define case nothing is in the data. go back to posts page
    if (!maintenance) {
      return {
        redirect: {
          destination: '/dashboard/posts',
        },
      };
    }

    // by default show the single post
    return {
      props: {
        maintenance,
      },
    };
  } catch (error) {
    // log error and send to posts page
    console.error(error);
    return {
      redirect: {
        destination: '/dashboard/posts',
      },
    };
  }
};

export default MaintenancePage;
