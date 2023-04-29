import { Carousel } from '@mantine/carousel';
import { ActionIcon, Box, Button, Group, Overlay } from '@mantine/core';
import Image from 'next/image';
import { Fragment, useRef, useState } from 'react';
import { Icons } from '../../data/icons';
import { PATH_API } from '../../path/api-routes';
import { useCrudSelectors } from '../../redux/features/crud/crudSlice';
import axiosInstance from '../../utils/axios-instance';
import ImageSlide from './ImageSlide';
import { Sections } from '../../types/general/data/sections-type';
// import { Image } from '@mantine/core';

type ImageType = File | UploadModel;

function CrudCarousel({
  images,
  entity,
  formField,
}: {
  images: File[] | UploadModel[];
  entity: Sections;
  formField: FormFieldInterface;
}) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const {} = useCrudSelectors();
  // const currentImage= useRef<File | UploadModel>()
  const currentImage = images[currentImageIndex];
  const { selectedCrudDocument } = useCrudSelectors(entity);
  const handleDelete = async (image: ImageType) => {
    const isFile = image instanceof File;
    console.log(`root entity for the deleting image is ${entity}`);
    if (isFile) {
      return;
    }
    if (window.confirm('Are you sure you want to delete this image?')) {
      const res = await axiosInstance.delete(
        `${PATH_API.uploads}/${entity}/${selectedCrudDocument._id}/${formField.name}/${image._id}`
      );
      console.log(res.data.data);
    }
  };

  const colors = ['red', 'green', 'blue', 'yellow', 'orange', 'purple', 'pink', 'gray'];

  if (true) {
    return (
      <Carousel maw={600} mx="auto" slideGap="md" withIndicators height={500}>
        {images.map((image, i) => (
          <ImageSlide image={image} handleDelete={handleDelete} />
        ))}
      </Carousel>
    );
  }
}

export default CrudCarousel;
