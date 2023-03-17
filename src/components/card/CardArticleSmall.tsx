import { createStyles, Card, Image, Avatar, Text, Group, Box } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.white,
    maxWidth: 400,
    // width: 300,
    height: 150,
    // flex: '1 auto',
    padding: 10,
    border: '1px solid red',
    gridRowEnd: 'span 1',
  },

  title: {
    fontWeight: 700,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    lineHeight: 1.2,
  },

  body: {
    padding: theme.spacing.md,
  },
}));

interface CardArticleImageDescFooterVerticalProps {
  image: string;
  category: string;
  title: string;
  date: string;
  author: {
    name: string;
    avatar: string;
  };
}

export function CardArticleSmall({
  image,
  category,
  title,
  date,
  author = { name: 'not registered user', avatar: '' },
}: CardArticleImageDescFooterVerticalProps) {
  const { classes } = useStyles();
  return (
    <Card withBorder radius="md" p={0} className={classes.card}>
      <Group noWrap spacing={0}>
        {image && <Image src={image} height={140} width={140} />}
        <div className={classes.body}>
          <Text transform="uppercase" color="dimmed" weight={700} size="xs">
            {category}
          </Text>
          <Text className={classes.title} mt="xs" mb="md">
            {title}
          </Text>
          <Group noWrap spacing="xs">
            <Group spacing="xs" noWrap>
              <Avatar size={20} src={''} />
              <Text size="xs">{author?.name || 'hh'}</Text>
            </Group>
            <Text size="xs" color="dimmed">
              •
            </Text>
            <Text size="xs" color="dimmed">
              {date}
            </Text>
          </Group>
        </div>
      </Group>
    </Card>
  );
}
