import { createStyles, SimpleGrid, Card, Image, Text, Container, AspectRatio } from '@mantine/core';
import fetch from 'node-fetch';

import { GetServerSidePropsContext } from 'next';
import { ReactElement, useEffect } from 'react';
import Layout from '../../layouts';
import PostsPageSection from '../../sections/posts_list_section/PostsPageComponent';
import axiosInstance from '../../utils/axios-instance';
import { useCrudSliceStore } from '../../redux/features/crud/crudSlice';
import { useCurrentSpaceContext } from '../../context/CurrentSpaceContext';

export default function PostsPage({ threads }: { threads: ThreadModel[] }) {
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
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/threads`, {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
      space: context.req.cookies.space || '',
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
