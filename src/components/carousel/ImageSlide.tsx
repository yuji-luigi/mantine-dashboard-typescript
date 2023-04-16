import { Carousel } from '@mantine/carousel';
import { Box, ActionIcon, Overlay, Button } from '@mantine/core';
import React from 'react';
import { Icons } from '../../data/icons';
import Image from 'next/image';

type ImageType = File | UploadModel;

const ImageSlide = ({
  image,
  handleDelete,
}: {
  image: ImageType;
  handleDelete: (image: ImageType) => Promise<void>;
}) => {
  const isFile = image instanceof File;

  return (
    <Carousel.Slide key={isFile ? image.name : image._id}>
      <Box sx={{ position: 'relative' }}>
        <ActionIcon
          onClick={() => handleDelete(image)}
          sx={{
            position: 'absolute',
            right: 10,
            top: 10,
            background: 'white',
            opacity: 0.8,
            borderRadius: 999,
            zIndex: 2,
          }}
        >
          <Icons.close />
        </ActionIcon>
        <Overlay
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1,
            cursor: 'pointer',
            transition: 'opacity 0.3s ease-in-out',
            opacity: 0,
            '&:hover': { opacity: 1, transition: 'opacity 0.3s ease-in-out' },
          }}
          onClick={() => {
            console.log(image);
          }}
          component="div"
        >
          <Button bg="transparent" variant="outline" leftIcon={<Icons.edit />}>
            Edit
          </Button>
        </Overlay>
        <Image
          src={isFile ? URL.createObjectURL(image) : image.url}
          width={600}
          height={500}
          alt={isFile ? image.name : image.originalFileName}
          style={{ objectFit: 'cover' }}
        />
      </Box>
    </Carousel.Slide>
  );
};

export default ImageSlide;
