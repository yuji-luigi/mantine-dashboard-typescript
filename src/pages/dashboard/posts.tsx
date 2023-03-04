import { createStyles, SimpleGrid, Card, Image, Text, Container, AspectRatio } from '@mantine/core';
import { ReactElement } from 'react';
import Layout from '../../layouts';
import PostsPageSection from '../../sections/homepage/posts/PostsPage';

export default function PostsPage() {
  return <PostsPageSection />;
}

PostsPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout variant="dashboard">{page}</Layout>;
};
