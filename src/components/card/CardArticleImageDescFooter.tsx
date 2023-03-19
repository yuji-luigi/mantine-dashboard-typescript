import { IconBookmark, IconHeart, IconShare } from '@tabler/icons-react';
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
  Stack,
  Box,
} from '@mantine/core';
import { CSSProperties } from 'react';

const useStyles = createStyles((theme) => ({
  card: {
    position: 'relative',
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    // maxWidth: 350,
    // maxWidth: '100%',
    // maxHeight: 450,
    // width: 400,
    height: 300,
    // flex: '1 auto',
    padding: 10,
    // border: '1px solid red',
    gridRowEnd: 'span 2',
  },

  rating: {
    position: 'absolute',
    top: theme.spacing.xs,
    right: rem(12),
    pointerEvents: 'none',
  },

  title: {
    display: 'block',
    marginTop: theme.spacing.md,
    marginBottom: rem(5),
  },

  buttons: {
    height: '100%',
    alignItems: 'flex-end',
  },
  action: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    ...theme.fn.hover({
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1],
    }),
  },

  footer: {
    marginTop: theme.spacing.md,
  },
}));

interface CardArticleImageDescFooterProps {
  image?: string;
  link: string;
  title: string;
  description: string;
  rating: string;
  sx: CSSProperties;
  author: {
    name: string;
    image?: string;
  };
}

export function CardArticleImageDescFooter({
  className,
  image,
  link,
  title,
  description,
  author = { name: 'not registered user', image: '' },
  rating,
  sx,
  ...others
}: CardArticleImageDescFooterProps &
  Omit<React.ComponentPropsWithoutRef<'div'>, keyof CardArticleImageDescFooterProps>) {
  const { classes, cx, theme } = useStyles();
  const linkProps = { href: `posts/${link}`, target: '_blank', rel: 'noopener noreferrer' };
  return (
    <Card withBorder radius="md" className={cx(classes.card, className)} {...others}>
      {image && (
        <Card.Section>
          <a {...linkProps}>
            <Image src={image} height={180} />
          </a>
        </Card.Section>
      )}

      {/* <Badge className={classes.rating} variant="gradient" gradient={{ from: 'yellow', to: 'red' }}>
        {rating}
      </Badge> */}
      <Box sx={{ height: 100, overflow: 'hidden' }}>
        <Text className={classes.title} fw={500} component="a" {...linkProps}>
          {title}
        </Text>

        <Text fz="sm" color="dimmed" lineClamp={4}>
          {description}
        </Text>
      </Box>

      <Group position="apart" className={classes.footer}>
        <Stack>
          <Center>
            <Avatar src={''} size={24} radius="xl" mr="xs" />
            <Text fz="sm" inline>
              {author.name}
            </Text>
          </Center>
          <Center>
            <Text fz="sm" inline>
              {author.name}
            </Text>
          </Center>
        </Stack>

        <Group spacing={8} mr={0} className={classes.buttons}>
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
      </Group>
    </Card>
  );
}
