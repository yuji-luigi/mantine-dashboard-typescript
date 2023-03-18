import { createStyles, SimpleGrid, Card, Image, Text, Container, AspectRatio } from '@mantine/core';
import fetch from 'node-fetch';

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
  const nodeEnv = process.env.NODE_ENV;
  let API_URL = process.env.NEXT_PUBLIC_API_URL;
  const jwtToken = context.req.cookies.jwt;

  // const res = await axiosInstance.get(`/api/v1/cms`, { params: { section: 'home' } });
  console.log(process.env.NEXT_PUBLIC_API_URL || 'env.NEXT_PUBLIC_API_URL: undefined');
  console.log(process.env.NODE_ENV);

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/public/threads`, {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
  });

  const data = (await res.json()) as Record<string, any>;

  const threads = data.data || [];

  return {
    props: {
      threads,
    },
  };
}
