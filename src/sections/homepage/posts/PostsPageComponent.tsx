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
import { UserCard } from '../../../components/card/UserCard';
import { CardArticleSmall } from '../../../components/card/CardArticleSmall';
import { CardArticleImageDescFooter } from '../../../components/card/CardArticleImageDescFooter';
import CardArticleImageBig from '../../../components/card/CardArticleImageBig';
import axiosInstance from '../../../utils/axios-instance';
const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface TypeMock {
  title: string;
  description: string;
  date: string;
  image?: undefined;
  createdBy?: undefined;
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
  createdBy: string;
}

const useStyles = createStyles((theme) => ({
  pinContainer: {
    // position: 'absolute',
    width: '100%',
    // left: '50%',
    // transform: 'translateX(-50%)',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, 400px)',
    gridAutoRows: 'minmax(50px, auto)',
    justifyContent: 'center',
    gap: 10,
  },
}));

export default function PostsPage({ threads }: { threads: Thread[] }) {
  const { classes, cx, theme } = useStyles();

  return (
    <Container py="xl">
      <Box
        className={classes.pinContainer} /* cols={2} breakpoints={[{ maxWidth: 'sm', cols: 1 }]} */
      >
        {/* todo create Cards component where differentiate card by thread.type */}
        {threads.map((thread) => (
          <CardArticleSmall
            key={thread.title}
            author={thread.createdBy}
            category={thread.tags?.toString() || 'tech'}
            date={thread.createdAt}
            image={thread.images[0].url}
            title={thread.title}
          />
        ))}

        {threads.map((thread) => (
          <CardArticleImageDescFooter
            key={thread.title}
            className={''}
            image={thread.images[0].url}
            link={thread._id}
            title={thread.title}
            description={thread.description}
            author={thread.createdBy}
            rating={'40' /* thread.rating ||  */}
            sx={{ width: 300 }}
          />
        ))}
      </Box>
    </Container>
  );
}
