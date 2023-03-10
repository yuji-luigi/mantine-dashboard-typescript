import { createStyles, SimpleGrid, Card, Image, Text, Container, AspectRatio } from '@mantine/core';
import { GetServerSidePropsContext } from 'next';
import { ReactElement } from 'react';
import Layout from '../../layouts';
import PostsPageSection from '../../sections/homepage/posts/PostsPageComponent';
import axiosInstance from '../../utils/axios-instance';

export default function PostsPage({ threads }: { threads: Thread[] }) {
  return <PostsPageSection threads={threads} />;
}

PostsPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout variant="dashboard">{page}</Layout>;
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const jwtToken = context.req.cookies.jwt;
  // const res = await axiosInstance.get(`/api/v1/cms`, { params: { section: 'home' } });
  const res = await axiosInstance.get(`${process.env.NEXT_PUBLIC_API_URL}/public/threads`, {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
  });

  const threads = res.data.data || [];

  return {
    props: {
      threads,
    },
  };

  // ...
}
