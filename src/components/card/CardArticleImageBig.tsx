import { AspectRatio, Box, Card, createStyles, Text, Image } from '@mantine/core';
import React from 'react';
import { TypeMock } from '../../sections/homepage/posts/PostsPageComponent';

const useStyles = createStyles((theme) => ({
  card: {
    transition: 'transform 150ms ease, box-shadow 150ms ease',

    '&:hover': {
      transform: 'scale(1.01)',
      boxShadow: theme.shadows.md,
    },
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 600,
  },
  description: { fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 600 },
}));

const CardArticleImageBig = ({ article }: { article: TypeMock }) => {
  const { classes } = useStyles();

  return (
    <Card
      key={article.title}
      sx={{ maxHeight: 400 }}
      p="md"
      radius="md"
      component="a"
      href="#"
      className={classes.card}
    >
      <Box sx={{ height: 300, overflow: 'hidden' }}>
        <Text className={classes.title} align="center" my={5} mb={10}>
          {article.title}
        </Text>
        {article.image && (
          <AspectRatio ratio={1920 / 1080}>
            <Image src={article.image} />
          </AspectRatio>
        )}

        <Text size={15} mt={5}>
          {article.description}
        </Text>
      </Box>
      <Box sx={{ height: 100 }}>
        <Text color="dimmed" size="xs" transform="uppercase" align="right" weight={700} mt="md">
          {article.date}
        </Text>
      </Box>
    </Card>
  );
};

export default CardArticleImageBig;
