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
import PostEditButton from '../../../sections/single_post_section/PostEditButton';
import SinglePostArticleArea from '../../../sections/single_post_section/SinglePostArticleArea';
import RelatedArticlesArea from '../../../sections/single_post_section/RelatedArticleArea';
import SinglePostHeading from '../../../sections/single_post_section/SinglePostHeading';
import { CrudDrawerDefault } from '../../../components/drawer/CrudDrawerDefault';

const useStyles = createStyles((theme) => ({
  main: {
    minHeight: 'calc(100vh - 64px)',
  },

  articleMenuDivider: {
    marginBlock: theme.spacing.xl,
  },
}));

const PostIdPage = ({ thread }: { thread: Thread }) => {
  const { classes, cx, theme } = useStyles();

  return (
    <Container py="lg" className={classes.main}>
      <SinglePostHeading thread={thread} />
      <PostEditButton thread={thread} />
      <SinglePostArticleArea thread={thread} />
      <Divider className={classes.articleMenuDivider} />
      <RelatedArticlesArea />
      <CrudDrawerDefault overrideEntity="threads" />
    </Container>
  );
};
PostIdPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout variant="dashboard">{page}</Layout>;
};
export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const jwtToken = context.req.cookies.jwt;
  const rawThread = await axiosInstance.get(
    `${process.env.NEXT_PUBLIC_API_URL}/threads/${context.query.postId}`,
    {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    }
  );
  return {
    props: {
      thread: await rawThread.data.data,
    },
  };
};

export default PostIdPage;
