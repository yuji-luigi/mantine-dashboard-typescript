//useSWR allows the use of SWR inside function components
import useSWR from 'swr';

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
  Grid,
} from '@mantine/core';
//Write a fetcher function to wrap the native fetch function and return the result of a call to url in json format
// import { UserCard } from '../../../components/card/UserCard';
import { UserCard } from '../../components/card/UserCard';
import { CardArticleSmall } from '../../components/card/CardArticleSmall';
import { CardArticleImageDescFooter } from '../../components/card/CardArticleImageDescFooter';
import CardArticleImageBig from '../../components/card/CardArticleImageBig';
import axiosInstance from '../../utils/axios-instance';
import PostList from './PostList';
import { useCrudSelectors } from '../../redux/features/crud/crudSlice';
// import { useCurrentSpaceContext } from '../../context/CurrentSpaceContext';
import { useCookieContext } from '../../context/CookieContext';
const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface TypeMock {
  title: string;
  description: string;
  date: string;
  image?: undefined;
  user?: undefined;
}

interface mock2 {
  image: string;
  avatar: string;
  name: string;
  description: string;
  job: string;
  stats: {
    value: string;
    label: string;
  }[];
  user: string;
}

const useStyles = createStyles((theme) => ({
  pinContainer: {
    // position: 'absolute',
    // width: '100%',
    // left: '50%',
    // transform: 'translateX(-50%)',
    display: 'grid',
    // gridTemplateColumns: 'repeat(auto-fit, minmax(400px, max-content))',
    gridTemplateColumns: 'repeat(auto-fill, 400px)',
    // gridAutoColumns: 'repeat(400px, minmax(400px, 1fr))',
    gridAutoRows: 'minmax(50px, auto)',
    justifyContent: 'center',
    gap: 10,
  },
}));

export default function PostListPageComponent() {
  const { classes, cx, theme } = useStyles();
  const { crudDocuments: threads } = useCrudSelectors('threads');
  const { currentSpace } = useCookieContext();
  return (
    // <Container mx="auto" py="xl">
    <Box
      className={classes.pinContainer}
      py="xl" /* cols={2} breakpoints={[{ maxWidth: 'sm', cols: 1 }]} */
    >
      {/* todo create Cards component where differentiate card by thread.type */}
      {threads.map((thread) => (
        <PostList key={thread._id} thread={thread} />
      ))}
    </Box>
    // </Container>
  );
}
