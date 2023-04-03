import { createStyles, SimpleGrid, Card, Image, Text, Container, AspectRatio } from '@mantine/core';
import fetch from 'node-fetch';

import { GetServerSidePropsContext } from 'next';
import { ReactElement, useEffect } from 'react';
import Layout from '../../../layouts';
import PostsPageSection from '../../../sections/posts_section/PostsPageComponent';
import axiosInstance from '../../../utils/axios-instance';
import { useCrudSliceStore } from '../../../redux/features/crud/crudSlice';

export default function PostsPage({ threads }: { threads: Thread[] }) {
  const { setCrudDocuments } = useCrudSliceStore();
  useEffect(() => {
    setCrudDocuments({ entity: 'threads', documents: threads });
  }, [threads]);
  return <PostsPageSection /* threads={threads} */ />;
}

PostsPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout variant="dashboard">{page}</Layout>;
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const jwtToken = context.req.cookies.jwt;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/maintenances`, {
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
