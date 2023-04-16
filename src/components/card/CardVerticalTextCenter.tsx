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
    fontSize: 32,
    textAlign: 'center',
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
    justifyContent: 'center',
    height: '100%',
    // zIndex: 55,
  },
}));

export interface CardData {
  _id: string;
  name: string;
  address: string;
  createdAt: string;
  user?: UserModel;
}

interface CardArticleImageDescFooterVerticalProps {
  // data: SpaceModel | OrganizationModel;
}
export function CardArticleVerticalTextCenter({}: CardArticleImageDescFooterVerticalProps) {
  // const description =
  //   data.description?.length > 50 ? `${data.description.substring(0, 50)}...` : data.description;
  const { classes, cx } = useStyles();
  const router = useRouter();

  return (
    <Link href={`}`} className={classes.link}>
      <Card withBorder radius="md" p={0} className={classes.card}>
        <BackgroundImage className={classes.bgImage} src={''} radius="sm">
          <Box className={classes.bgImageGradient} />

          <div className={classes.body}>
            <Text className={cx(classes.title, classes.appear)} /* mt="xs" mb="xs" */>
              data name
            </Text>
            <Text
              className={classes.appear}
              transform="uppercase"
              color="dimmed"
              weight={700}
              size="xs"
            >
              desc1 Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur, in.
            </Text>
            <Group noWrap className={classes.appear} spacing="xs">
              <Group spacing="xs" noWrap>
                <Avatar size={20} src={''} />
                <Text size="xs">user name</Text>
              </Group>
              <Text size="xs" color="dimmed">
                •
              </Text>
              <Text size="xs" color="dimmed">
                date 1990/01/01
              </Text>
            </Group>
          </div>
        </BackgroundImage>
      </Card>
    </Link>
  );
}
