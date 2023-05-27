import {
  Card,
  Group,
  Avatar,
  Stack,
  Box,
  Title,
  Divider,
  Text,
  createStyles,
  em,
} from '@mantine/core';
import React from 'react';
import { Icons } from '../../../data/icons';
import AttachmentsRow from '../AttachmentsRow';
import CarouselBasic from '../../carousel/CarouselBasic';
const useStyles = createStyles((theme) => ({
  feedCard: {
    minHeight: 200,
  },
  feedContent: {
    padding: 16,
    paddingInline: 24,
  },
}));

interface PostFeedCardProps {
  createdBy: UserModel;
  title: string;
  body: string;
  attachments: UploadModel[];
  images: UploadModel[];
}

const PostFeedCard = ({ createdBy, title, body, attachments, images }: PostFeedCardProps) => {
  const { cx, classes, theme } = useStyles();

  return (
    <Card className={classes.feedCard}>
      <Group sx={{ height: 80, width: '100%', display: 'flex', justifyContent: 'space-between' }}>
        <Group sx={{ height: '100%' }}>
          <Avatar src="https://picsum.photos/410/300" radius={90} size={80} />
          <Stack spacing={0} justify="flex-end" style={{ height: '100%', alignItems: 'flex-end' }}>
            <Text size="lg" weight="bold">
              {createdBy.name}
            </Text>
            <Text>{new Intl.DateTimeFormat('en-US').format(new Date())}</Text>
          </Stack>
        </Group>

        <Box sx={{ alignSelf: 'start' }}>
          <Icons.edit />
        </Box>
      </Group>

      <Box className={classes.feedContent}>
        <Title mb={16}>{title}</Title>
        <Text>{body}</Text>
      </Box>
      <CarouselBasic images={images} />
      <Divider mb={16} />
      <AttachmentsRow attachments={attachments} />
    </Card>
  );
};

export default PostFeedCard;
