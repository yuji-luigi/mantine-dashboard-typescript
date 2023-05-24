import React, { ChangeEvent, useState } from 'react';
import { Card, Avatar, Text, Paper, Box, Group, ActionIcon } from '@mantine/core';
import { Icons } from '../../data/icons';
import { setSubmitting, useCrudSliceStore } from '../../redux/features/crud/crudSlice';
import { getWordNextToFromUrl } from '../../utils/helper-functions';
import axiosInstance from '../../utils/axios-instance';
import { PATH_API } from '../../path/api-routes';
import { extractUploadingMedia, uploadFileAndGetModelId } from '../../utils/upload-helper';
import { notifications } from '@mantine/notifications';
import { useRouter } from 'next/router';

export interface ProfileCoverDataProps {
  title: string;
  subtitle: string;
  avatarUrl: string;
  backgroundImage?: string;
}

const ProfileCover = ({ data }: { data: ProfileCoverDataProps }) => {
  const { documentId } = useRouter().query;
  const _entity = getWordNextToFromUrl();
  const { updateCrudDocument } = useCrudSliceStore();
  console.log(data.avatarUrl);
  const [selectedImage, setSelectedImage] = useState<string | undefined>(data.avatarUrl);

  const handleImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !_entity) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setSelectedImage(reader.result as string);
    };
    reader.readAsDataURL(file);

    try {
      const uploadIdData = await uploadFileAndGetModelId({ avatar: [file] }, _entity);

      updateCrudDocument({
        entity: _entity,
        documentId: documentId as string,
        updateData: { avatar: uploadIdData.avatar[0] },
      });
    } catch (error) {
      console.log(error);
      notifications.hide('submit');
      setSubmitting(false);
      return;
    }
    const rawUpload = await axiosInstance.post(PATH_API.uploads, file);
  };

  return (
    <Card
      shadow="sm"
      padding="lg"
      sx={{
        borderRadius: 12,

        width: '100%',
        backgroundImage:
          'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("https://picsum.photos/410/300")',

        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '200px',
        display: 'flex',
        alignItems: 'flex-end',
      }}
    >
      <Group sx={{ justifyContent: 'space-between', width: '100%' }}>
        <Group>
          {/* <label htmlFor="avatar-input">
            <Avatar
              sx={{ cursor: 'pointer' }}
              size={100}
              radius={80}
              src={selectedImage}
              alt={data.title + ' avatar'}
              style={{ marginRight: '1rem' }}
            />
            <input
              id="avatar-input"
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleImageChange}
            />
          </label> */}
          <Box
            sx={{
              position: 'relative',
              display: 'inline-block',
              zIndex: 50,
            }}
          >
            <label htmlFor="avatar-input">
              <Avatar
                sx={{ cursor: 'pointer' }}
                size={100}
                radius={80}
                src={selectedImage}
                alt={data.title + ' avatar'}
                style={{ marginRight: '1rem' }}
              />
              <input
                id="avatar-input"
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handleImageChange}
              />
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  borderRadius: 100,
                  background: 'gray',
                  height: 100,
                  width: 100,
                  opacity: 0,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'end',
                  justifyContent: 'center',
                  transition: 'all 200ms ease-in-out',
                  '&:hover': {
                    opacity: 0.7,
                  },
                }}
              >
                <Text fw={800} mb={8}>
                  Edit
                </Text>
              </Box>
            </label>
          </Box>
          <Box sx={{ alignSelf: 'start' }}>
            <Text weight={700} size="xl">
              {data.title}
            </Text>
            <Text size="md">{data.subtitle}</Text>
          </Box>
        </Group>

        <ActionIcon>
          <Icons.pencil />
        </ActionIcon>
      </Group>
    </Card>
  );
};

export default ProfileCover;
