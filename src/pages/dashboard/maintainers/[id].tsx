import {
  Box,
  Card,
  Container,
  Title,
  createStyles,
  em,
  getBreakpointValue,
  rem,
  Text,
  Group,
  Avatar,
  Stack,
  Divider,
} from '@mantine/core';
import React, { ReactElement } from 'react';
import Layout from '../../../layouts';
import ProfileCover, { ProfileCoverDataProps } from '../../../components/profile/ProfileCover';
import { useCrudSelectors, useCrudSliceStore } from '../../../redux/features/crud/crudSlice';
import { useRouter } from 'next/router';
import { getWordNextToFromUrl } from '../../../utils/helper-functions';
import { Sections } from '../../../types/general/data/sections-type';
import useSWR from 'swr';
import axiosInstance from '../../../utils/axios-instance';
import { PATH_API } from '../../../path/api-routes';
import AboutCard from '../../../components/profile/side/AboutCard';
import { useMediaQuery } from '@mantine/hooks';
import ProfileSide from '../../../components/profile/side/ProfileSide';
import Image from 'next/image';
import { PATH_IMAGE, RANDOM_UPLOAD_MODELS } from '../../../lib/image-paths';
import AttachmentsRow from '../../../components/posts/AttachmentsRow';
import { Icons } from '../../../data/icons';
import PostFeedCard from '../../../components/posts/feed/PostFeedCard';

const useStyles = createStyles((theme) => ({
  container: {
    // paddingInline: 'auto',
    paddingBlock: 32,
  },
  box: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    // height: rem(100),
    // backgroundColor: theme.colors.blue[6],

    // Media query with value from theme
    // [`@media (max-width: ${em(getBreakpointValue(theme.breakpoints.xl) - 1)})`]: {
    //   backgroundColor: theme.colors.pink[6],
    // },

    // Simplify media query writing with theme functions
    [theme.fn.smallerThan('sm')]: {
      flexDirection: 'column',
      // backgroundColor: theme.cdolors.yellow[6],
    },

    // Static media query
    [`@media (max-width: ${em(800)})`]: {
      // backgroundColor: theme.colors.orange[6],
    },
  },
  cardMain: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    width: '70%',
    [theme.fn.smallerThan('md')]: {
      width: '60%', // backgroundColor: theme.cdolors.yellow[6],
    },
    [theme.fn.smallerThan('sm')]: {
      width: '100%', // backgroundColor: theme.cdolors.yellow[6],
    },
  },
  sideBox: {
    width: '30%',
    gap: 16,
    display: 'flex',
    flexDirection: 'column',
    [theme.fn.smallerThan('md')]: {
      width: '40%', // backgroundColor: theme.cdolors.yellow[6],
    },
    [theme.fn.smallerThan('sm')]: {
      width: '100%', // backgroundColor: theme.cdolors.yellow[6],
      // flexDirection: 'row',
    },
  },
  feedCard: {
    minHeight: 200,
  },
  feedContent: {
    padding: 16,
    paddingInline: 24,
  },
}));

const getMaintainer = async (id?: string) => {
  if (!id) return;
  const res = await axiosInstance.get(`${PATH_API.maintainers}/${id}`);
  return res.data.data;
};

const MaintainerDetailsPage = () => {
  const { cx, classes, theme } = useStyles();
  const router = useRouter();
  const _entity = getWordNextToFromUrl() as Sections;
  const {
    data: document,
    error,
    isLoading,
  } = useSWR(['maintainer', router.query.id], () => getMaintainer(router.query.id as string));

  const isMobile = useMediaQuery('(max-width: 600px)');
  if (isLoading) return 'isLoading';

  const data = document
    ? { title: document.name, subtitle: document.company, avatar: 'https://picsum.photos/400/300' }
    : ({} as ProfileCoverDataProps);
  return (
    <Container className={classes.container}>
      <Box className={classes.box}>
        <Box className={classes.cardMain}>
          <ProfileCover data={data} />
          {isMobile && <ProfileSide />}
          <PostFeedCard
            createdBy={{ name: 'No name user' } as UserModel}
            title="The First Job!"
            body={lorem100}
            images={RANDOM_UPLOAD_MODELS}
            attachments={[]}
          />
        </Box>
        {!isMobile && <ProfileSide />}
      </Box>
    </Container>
  );
};

MaintainerDetailsPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default MaintainerDetailsPage;

const lorem100 =
  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Id, placeat labore voluptatum corrupti sunt laborum rerum earum autem fuga, aperiam animi, molestias ullam atque quisquam amet ea expedita. Repudiandae, facere?Lorem ipsum dolor sit amet consectetur adipisicing elit. Id, placeat labore voluptatum corrupti sunt laborum rerum earum autem fuga, aperiam animi, molestias ullam atque quisquam amet ea expedita. Repudiandae, facere?Lorem ipsum dolor sit amet consectetur adipisicing elit. Id, placeat labore voluptatum corrupti sunt laborum rerum earum autem fuga, aperiam animi, molestias ullam atque quisquam amet ea expedita. Repudiandae, facere?Lorem ipsum dolor sit amet consectetur adipisicing elit. Id, placeat labore voluptatum corrupti sunt laborum rerum earum autem fuga, aperiam animi, molestias ullam atque quisquam amet ea expedita. Repudiandae, facere?';
