import React, { ChangeEvent, useState } from 'react';
import { Card, Avatar, Text, Paper, Box, Group, ActionIcon } from '@mantine/core';
import { Icons } from '../../data/icons';

export interface ProfileCoverDataProps {
  title: string;
  subtitle: string;
  avatar?: string;
  backgroundImage?: string;
}

const ProfileCover = ({ data }: { data: ProfileCoverDataProps }) => {
  const [selectedImage, setSelectedImage] = useState<string | undefined>(data.avatar);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
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
          <label htmlFor="avatar-input">
            <Avatar
              size={100}
              radius={80}
              src={selectedImage || data.avatar}
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
          </label>
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
