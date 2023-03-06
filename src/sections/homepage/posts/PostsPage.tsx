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
} from '@mantine/core';
//Write a fetcher function to wrap the native fetch function and return the result of a call to url in json format
// import { UserCard } from '../../../components/card/UserCard';
import { UserCard } from '../../../components/card/UserCard';
import { CardArticleSmall } from '../../../components/card/CardArticleSmall';
import { CardArticleImageDescFooter } from '../../../components/card/CardArticle';
import CardArticleImageBig from '../../../components/card/CardArticleImageBig';
const fetcher = (url: string) => fetch(url).then((res) => res.json());
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

export type TypeMock = typeof mockdata[1];
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

export default function PostsPage() {
  const { data, error } = useSWR('/api/data?fileName=CardArticleSmall', fetcher);
  const { data: articleCardData, error: artucleCardDat } = useSWR(
    '/api/data?fileName=articleCard',
    fetcher
  );
  // const { data, error } = useSWR('/mock/verticalCardArticleImageDescFooter.json', fetcher);
  const cards = mockdata.map((article) => <CardArticleImageBig article={article} />);
  const formatedData = data && JSON.parse(data);
  const formatedCardArticleImageDescFooterData = articleCardData && JSON.parse(articleCardData);
  const otherCards = mock2.map((data) => <UserCard key={data.name} data={data} />);
  const VACards =
    formatedData &&
    formatedData.map((VAData: any) => (
      <CardArticleSmall
        key={VAData.title}
        author={VAData.author}
        category={VAData.category}
        date={VAData.date}
        image={VAData.image}
        title={VAData.title}
      />
    ));
  const articleCards =
    formatedCardArticleImageDescFooterData &&
    formatedCardArticleImageDescFooterData.map((VAData: any) => (
      <CardArticleImageDescFooter
        key={VAData.title}
        className={VAData.className}
        image={VAData.image}
        link={VAData.link}
        title={VAData.title}
        description={VAData.description}
        author={VAData.author}
        rating={VAData.rating}
        sx={{ width: 300 }}
      />
    ));
  return (
    <Container py="xl">
      <SimpleGrid cols={2} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
        {/* {cards} */}
        {/* {otherCards} */}
        {VACards}
        {/* {articleCards} */}
      </SimpleGrid>
    </Container>
  );
}
