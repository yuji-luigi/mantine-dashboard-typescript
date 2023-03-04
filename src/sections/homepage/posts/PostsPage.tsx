import {
  createStyles,
  SimpleGrid,
  Card,
  Image,
  Text,
  Container,
  AspectRatio,
  Group,
  Box,
} from '@mantine/core';
// import { CardCustom } from '../../../components/card/CardCustom';
import { CardCustom } from '../../../components/card/CardCustom';
const mockdata = [
  {
    title: 'Top 10 places to visit in Norway this summer',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.   ',

    // image:
    //   'https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80',
    date: 'August 18, 2022',
  },
  {
    title: 'Best forests to visit in North America',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae quidem dicta culpa, vel ut reiciendis esse quaerat itaque, laborum ipsam sit eligendi. Eius nulla tenetur delectus quibusdam nemo consectetur labore. Pariatur, distinctio quos. Odio sapiente fugit itaque commodi nobis reiciendis quidem ab, dolorem ipsam cum dolores deserunt, nulla corporis velit.  ',
    image:
      'https://images.unsplash.com/photo-1448375240586-882707db888b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80',
    date: 'August 27, 2022',
    createdBy: 'name',
  },
  {
    title: 'Hawaii beaches review: better than you think',
    // image:
    //   'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80',
    date: 'September 9, 2022',
  },
  {
    title: 'Mountains at night: 12 best locations to enjoy the view',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae quidem dicta culpa, vel ut reiciendis esse quaerat itaque, laborum ipsam sit eligendi. Eius nulla tenetur delectus quibusdam nemo consectetur labore. Pariatur, distinctio quos. Odio sapiente fugit itaque commodi nobis reiciendis quidem ab, dolorem ipsam cum dolores deserunt, nulla corporis velit.  ',
    image:
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80',
    date: 'September 12, 2022',
    createdBy: 'name',
  },
];

const mock2 = [
  {
    image:
      'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80',
    avatar:
      'https://images.unsplash.com/photo-1623582854588-d60de57fa33f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80',
    name: 'Bill Headbanger',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae quidem dicta culpa, vel ut reiciendis esse quaerat itaque, laborum ipsam sit eligendi. Eius nulla tenetur delectus quibusdam nemo consectetur labore. Pariatur, distinctio quos. Odio sapiente fugit itaque commodi nobis reiciendis quidem ab, dolorem ipsam cum dolores deserunt, nulla corporis velit.  ',
    job: 'Fullstack engineer',
    stats: [
      {
        value: '34K',
        label: 'Followers',
      },
      {
        value: '187',
        label: 'Follows',
      },
      {
        value: '1.6K',
        label: 'Posts',
      },
    ],
    createdBy: 'name',
  },
  {
    image:
      'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80',
    avatar:
      'https://images.unsplash.com/photo-1623582854588-d60de57fa33f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80',
    name: 'Bill Headbanger',
    createdBy: 'Bill Headbanger',
    job: 'Fullstack engineer',
    stats: [
      {
        value: '34K',
        label: 'Followers',
      },
      {
        value: '187',
        label: 'Follows',
      },
      {
        value: '1.6K',
        label: 'Posts',
      },
    ],
  },
  {
    image:
      'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80',
    avatar:
      'https://images.unsplash.com/photo-1623582854588-d60de57fa33f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80',
    name: 'Bill Headbanger',
    job: 'Fullstack engineer',
    stats: [
      {
        value: '34K',
        label: 'Followers',
      },
      {
        value: '187',
        label: 'Follows',
      },
      {
        value: '1.6K',
        label: 'Posts',
      },
    ],
  },
];

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

export default function PostsPage() {
  const { classes } = useStyles();
  console.log('post');
  const cards = mockdata.map((article) => (
    // <Card
    //   key={article.title}
    //   p="md"
    //   radius="md"
    //   component="a"
    //   href="#"
    //   className={classes.card}
    //   sx={{ maxHeight: 400 }}
    // >
    //   {article.image && (
    //     <AspectRatio ratio={1920 / 1080}>
    //       <Image src={article.image} />
    //     </AspectRatio>
    //   )}
    //   <Text color="dimmed" size="xs" transform="uppercase" weight={700} mt="md">
    //     {article.date}
    //   </Text>
    //   <Text className={classes.title} mt={5}>
    //     {article.title}
    //   </Text>
    //   <Text size={15} mt={5}>
    //     {article.description}
    //   </Text>
    // </Card>
    <Card
      key={article.title}
      sx={{ maxHeight: 400 }}
      p="md"
      radius="md"
      component="a"
      href="#"
      className={classes.card}
    >
      <Box sx={{ height: 300 }}>
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
  ));

  const otherCards = mock2.map((data) => <CardCustom key={data.name} data={data} />);
  console.log(mock2);
  return (
    <Container py="xl">
      <SimpleGrid cols={2} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
        {cards}
        {otherCards}
      </SimpleGrid>
    </Container>
  );
}
