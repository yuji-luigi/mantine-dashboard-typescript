import React, { ChangeEvent, MouseEventHandler, useRef, useState } from 'react';
import { Card, Avatar, Text, Paper, Box, Group, ActionIcon, Button } from '@mantine/core';
import { Icons } from '../../data/icons';
import {
  setSubmitting,
  useCrudSelectors,
  useCrudSliceStore,
} from '../../redux/features/crud/crudSlice';
import { getWordNextToFromUrl } from '../../utils/helper-functions';
import axiosInstance from '../../utils/axios-instance';
import { PATH_API } from '../../path/api-routes';
import { extractUploadingMedia, uploadFileAndGetModelId } from '../../utils/upload-helper';
import { notifications } from '@mantine/notifications';
import { useRouter } from 'next/router';
import { useModalContext } from '@mantine/core/lib/Modal/Modal.context';
import { use_ModalContext } from '../../context/modal-context/_ModalContext';
import { Sections } from '../../types/general/data/sections-type';

export interface DataProp {
  title: string;
  subtitle: string;
  avatarUrl?: string;
  coverUrl?: string;
  backgroundImage?: string;
}

const ProfileCover = ({
  data,
  formFields,
}: {
  data: DataProp;
  formFields?: FormFieldInterface[];
}) => {
  const { documentId } = useRouter().query;
  const _entity = getWordNextToFromUrl() as Sections;
  const { updateCrudDocument } = useCrudSliceStore();
  const { selectDocumentById, selectedCrudDocument } = useCrudSelectors(_entity);
  const coverInputRef = useRef<HTMLInputElement>(null);
  const { openConfirmModal } = use_ModalContext();

  console.log(data.avatarUrl);
  const [selectedImage, setSelectedImage] = useState<string | undefined>(data.avatarUrl);
  const [selectedCover, setSelectedCover] = useState<string | undefined>(data.coverUrl);

  const onChangeCoverClicked = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    coverInputRef.current?.click();
  };

  const handleLightBoxClicked = () => {
    console.log('lightbox');
  };

  const handleImageChange = async (
    event: ChangeEvent<HTMLInputElement>,
    field: 'avatar' | 'cover' = 'avatar'
  ) => {
    const file = event.target.files?.[0];
    if (!file || !_entity) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      if (field === 'avatar') {
        setSelectedImage(reader.result as string);
      }
      if (field === 'cover') {
        setSelectedCover(reader.result as string);
      }
    };
    reader.readAsDataURL(file);

    try {
      const uploadIdData = await uploadFileAndGetModelId({ [field]: [file] }, _entity);

      updateCrudDocument({
        entity: _entity,
        documentId: documentId as string,
        updateData: { [field]: uploadIdData[field][0] },
      });
    } catch (error) {
      console.log(error);
      notifications.hide('submit');
      setSubmitting(false);
      return;
    }
    const rawUpload = await axiosInstance.post(PATH_API.uploads, file);
  };
  const handleEditClicked = () => {
    console.log('edit clicked');
    if (!formFields) return console.log('formFields not defined');
    console.log(selectedCrudDocument);
    openConfirmModal({
      type: 'crud',
      crudDocument: selectedCrudDocument,
      formFields,
      title: `Edit ${_entity}`,
      children: undefined,

      onCancel: function (): void {
        throw new Error('Function not implemented.');
      },
      onConfirm: function (data: any): void {
        throw new Error('Function not implemented.');
      },
    });
  };

  return (
    <Card
      shadow="sm"
      padding="lg"
      sx={{
        borderRadius: 12,
        position: 'relative',
        width: '100%',
        // width: '100%',
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${
          selectedCover || 'https://picsum.photos/410/300'
        })`,

        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '200px',
        display: 'flex',
        alignItems: 'flex-end',
      }}
    >
      <Box
        onClick={handleLightBoxClicked}
        sx={{
          transition: 'opacity 200ms ease-in-out',
          '&:hover': {
            opacity: 0.7,
          },
          top: 0,
          left: 0,
          position: 'absolute',
          width: '100%',
          height: '100%',
          background: 'rgba(0, 0, 0, 0.7)',
          color: '#fff',
          fontSize: '14px',
          fontWeight: 500,
          opacity: 0, // Initially hidden
        }}
      >
        <Group position="right">
          <input
            id="cover-input"
            type="file"
            ref={coverInputRef}
            accept="image/*"
            style={{ display: 'none' }}
            onChange={(e) => handleImageChange(e, 'cover')}
          />
          <Button m={8} color="dark" onClick={onChangeCoverClicked}>
            Change cover
          </Button>
        </Group>
      </Box>
      <Group sx={{ justifyContent: 'space-between', width: '100%' }}>
        <Group>
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
                  background: 'black',
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

        {formFields && (
          <ActionIcon onClick={handleEditClicked}>
            <Icons.pencil />
          </ActionIcon>
        )}
      </Group>
    </Card>
  );
};

export default ProfileCover;
