import { createStyles, SimpleGrid, Card, Image, Text, Container, AspectRatio } from '@mantine/core';
import { ReactElement } from 'react';
import Layout from '../../layouts';
import PostsPageSections from '../../sections/homepage/posts/PostsPageSctions';

export default function PostsPage() {
  <PostsPageSections />;
}

PostsPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout variant="dashboard">{page}</Layout>;
};
