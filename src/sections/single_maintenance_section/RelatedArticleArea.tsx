import { Card, Group, Box, createStyles } from '@mantine/core';
import React from 'react';

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

const RelatedArticlesArea = () => {
  const { classes, cx, theme } = useStyles();
  const relatedArticles = false;
  if (!relatedArticles) {
    return null;
  }
  return (
    <Card className={classes.articleArea}>
      <Group position="apart" align="flex-end" className={classes.footer}>
        <Box className={classes.relatedArticlesSection}></Box>
      </Group>
    </Card>
  );
};

export default RelatedArticlesArea;
