import React, { useEffect } from 'react';
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
import SinglePostArticleArea from '../../../sections/single_post_section/SinglePostArticleArea';
import RelatedArticlesArea from '../../../sections/single_post_section/RelatedArticleArea';
import SinglePostHeading from '../../../sections/single_post_section/SinglePostHeading';
import { CrudDrawerDefault } from '../../../components/drawer/CrudDrawerDefault';
import { selectCrudDocument } from '../../../redux/features/crud/crudSlice';
import { useCrudSliceStore, useCrudSelectors } from '../../../redux/features/crud/crudSlice';
import { useRouter } from 'next/router';
import { threadId } from 'worker_threads';

const useStyles = createStyles((theme) => ({
  main: {
    minHeight: 'calc(100vh - 64px)',
  },

  articleMenuDivider: {
    marginBlock: theme.spacing.xl,
  },
}));

const PostIdPage = ({ thread }: { thread: ThreadModel }) => {
  const { classes, cx, theme } = useStyles();

  const { query }: { query: ParsedQueryCustom } = useRouter();
  const { selectCrudDocument } = useCrudSliceStore();
  const { selectedCrudDocument: _thread } = useCrudSelectors('threads');

  useEffect(() => {
    if (!query.postId) return;
    selectCrudDocument({ entity: 'threads', document: thread });
    return () => {
      selectCrudDocument({ entity: 'threads', documentId: null });
    };
  }, []);

  if (!_thread?._id) return null;

  return (
    <Container py="lg" className={classes.main}>
      <SinglePostHeading thread={_thread} />
      <PostEditButton data={_thread} entity="threads" />
      <SinglePostArticleArea thread={_thread} />
      <Divider className={classes.articleMenuDivider} />
      <RelatedArticlesArea />
      <CrudDrawerDefault overridingEntity="threads" />
    </Container>
  );
};
PostIdPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout variant="dashboard">{page}</Layout>;
};
export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const jwtToken = context.req.cookies.jwt;
  try {
    const rawThread = await axiosInstance.get(
      `${process.env.NEXT_PUBLIC_API_URL}/threads/${context.query.postId}`,
      {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          space: context.req.cookies.space || '',
          organization: context.req.cookies.organization || '',
        },
      }
    );

    const thread = rawThread.data.data;
    // define case nothing is in the data. go back to posts page
    if (!thread) {
      return {
        redirect: {
          destination: '/dashboard/posts',
        },
      };
    }

    // by default show the single post
    return {
      props: {
        thread,
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

export default PostIdPage;
