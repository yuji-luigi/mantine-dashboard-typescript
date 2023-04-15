import {
  createStyles,
  Card,
  Image,
  Avatar,
  Text,
  Group,
  Box,
  Stack,
  BackgroundImage,
} from '@mantine/core';
import Link from 'next/link';
import { threadId } from 'worker_threads';
import { CARD_LINK_PATH, PATH_DASHBOARD } from '../../path/page-paths';
import { useRouter } from 'next/router';
import { PATH_IMAGE } from '../../lib/image-paths';

const useStyles = createStyles((theme) => ({
  link: {
    textDecoration: 'none',
  },
  card: {
    // backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.white,
    height: 500,
    // width: 300,
    // padding: 10,
    // display: 'flex',
    // flexDirection: 'column',
    // gridRowEnd: 'span 1',
    // cursor: 'pointer',
    // '&:hover': {
    //   backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[0],
    // },
    zIndex: 50,
  },

  bgImage: {
    background: 'linearGradient(0deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%)',
    height: '100%',
    zIndex: 50,
  },
  bgImageGradient: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    background: 'linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%)',
    zIndex: 51,
  },

  title: {
    fontWeight: 700,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    wordBreak: 'break-word',
    lineHeight: 1.2,
    zIndex: 55,
  },

  appear: {
    zIndex: 55,
  },

  body: {
    padding: theme.spacing.md,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'end',
    height: '100%',
    // zIndex: 55,
  },
}));

interface CardArticleImageDescFooterVerticalProps {
  image?: string;
  // category: string;
  // title: string;
  // date: string;
  hrefRoot: CARD_LINK_PATH;
  author: {
    name: string;
    avatar?: string;
  };
  data: ISpace;
}
export function CardArticleVertical({
  image,
  // title,
  data,
  hrefRoot,
  author = { name: 'not registered user', avatar: '' },
}: CardArticleImageDescFooterVerticalProps) {
  // const description =
  //   data.description?.length > 50 ? `${data.description.substring(0, 50)}...` : data.description;
  const { classes, cx } = useStyles();
  const router = useRouter();
  return (
    <Link href={`${hrefRoot}/${data._id}`} className={classes.link}>
      <Card withBorder radius="md" p={0} className={classes.card}>
        <BackgroundImage
          className={classes.bgImage}
          src={image || PATH_IMAGE.rootSpaceCard1}
          radius="sm"
        >
          <Box className={classes.bgImageGradient} />

          <div className={classes.body}>
            <Text className={cx(classes.title, classes.appear)} /* mt="xs" mb="xs" */>
              {data.name}
            </Text>
            <Text
              className={classes.appear}
              transform="uppercase"
              color="dimmed"
              weight={700}
              size="xs"
            >
              {data.address}
            </Text>
            <Group noWrap className={classes.appear} spacing="xs">
              <Group spacing="xs" noWrap>
                <Avatar size={20} src={''} />
                <Text size="xs">{author?.name || 'hh'}</Text>
              </Group>
              <Text size="xs" color="dimmed">
                •
              </Text>
              <Text size="xs" color="dimmed">
                {data._createdAt}
              </Text>
            </Group>
          </div>
        </BackgroundImage>
      </Card>
    </Link>
  );
}
