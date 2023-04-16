import { Card, Group, ActionIcon, createStyles, Divider, Box, Text } from '@mantine/core';
import { IconHeart, IconBookmark, IconShare } from '@tabler/icons-react';
import React from 'react';
import CarouselBasic from '../../components/carousel/CarouselBasic';

const useStyles = createStyles((theme) => ({
  // card: {
  //   position: 'relative',
  //   backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
  //   minHeight: '100vh',
  // },
  // header: {
  //   marginBottom: 50,
  // },
  // rating: {
  //   position: 'absolute',
  //   top: theme.spacing.xs,
  //   right: rem(12),
  //   pointerEvents: 'none',
  // },

  // title: {
  //   display: 'block',
  //   fontSize: 50,
  //   marginTop: theme.spacing.md,
  //   marginBottom: rem(5),
  // },
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

const SinglePostArticleArea = ({ thread }: { thread: ThreadModel }) => {
  const { classes, cx, theme } = useStyles();

  return (
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
    </Card>
  );
};

export default SinglePostArticleArea;
