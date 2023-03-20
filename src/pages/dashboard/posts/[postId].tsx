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

const useStyles = createStyles((theme) => ({
  card: {
    position: 'relative',
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    minHeight: '100vh',
  },
  header: {
    marginBottom: 50,
  },
  rating: {
    position: 'absolute',
    top: theme.spacing.xs,
    right: rem(12),
    pointerEvents: 'none',
  },

  title: {
    display: 'block',
    fontSize: 50,
    marginTop: theme.spacing.md,
    marginBottom: rem(5),
  },
  articleArea: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[0],
    boxShadow: theme.shadows.xl,
  },

  action: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    ...theme.fn.hover({
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1],
    }),
  },

  articleMenuDivider: {
    marginBlock: theme.spacing.xl,
  },
  relatedArticlesSection: {
    maxWidth: 300,
  },
  footer: {
    // paddingTop: theme.spacing.xl,
  },
}));

const PostIdPage = ({ thread }: { thread: Thread }) => {
  const { classes, cx, theme } = useStyles();
  const { user } = useAuth();

  const handleEdit = () => {
    console.log('edit');
  };

  return (
    <Container py="lg">
      <Stack className={classes.header}>
        <Text className={classes.title} fw={800} component="a">
          {thread.title}
        </Text>
        <Group align="center">
          <Avatar src={thread.createdBy.image} size={50} radius="xl" mr={0} />
          <Text fz="sm" inline>
            {thread.createdBy.name}
          </Text>
          <Text fz="sm" inline>
            {thread._createdAt}
          </Text>
        </Group>
      </Stack>
      {user?._id === thread.createdBy._id && (
        <Group position="right" mb={10}>
          <ActionIcon className={classes.action}>
            <IconSettings size="1rem" />
          </ActionIcon>
        </Group>
      )}

      <Card className={classes.articleArea}>
        <Text fz="md" fw={500} color="dimmed" lineClamp={4}>
          {thread.description}
        </Text>
        <CarouselBasic images={thread.images} />
        <Group position="right" spacing={8} mt={10}>
          <ActionIcon className={classes.action}>
            <IconHeart size="1rem" color={theme.colors.red[6]} />
          </ActionIcon>
          <ActionIcon className={classes.action}>
            <IconBookmark size="1rem" color={theme.colors.yellow[7]} />
          </ActionIcon>
          <ActionIcon className={classes.action}>
            <IconShare size="1rem" />
          </ActionIcon>
        </Group>
        <Divider className={classes.articleMenuDivider} />
        <Group position="apart" align="flex-end" className={classes.footer}>
          <Box className={classes.relatedArticlesSection}></Box>
        </Group>
      </Card>
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
