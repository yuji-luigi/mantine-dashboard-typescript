import { Carousel } from '@mantine/carousel';
import { ActionIcon, Box, Button, Group, Overlay } from '@mantine/core';
import Image from 'next/image';
import { Fragment, useRef, useState } from 'react';
import { Icons } from '../../data/icons';
import axiosInstance from '../../utils/axios-instance';
// import { Image } from '@mantine/core';

type ImageType = File | Upload;

function CrudCarousel({ images }: { images: File[] | Upload[] }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  // const currentImage= useRef<File | Upload>()
  const currentImage = images[currentImageIndex];

  const handleDelete = async (image: ImageType) => {
    const isFile = image instanceof File;
    if (window.confirm('Are you sure you want to delete this image?')) {
      console.log(image);
      // const res = await axiosInstance.delete();
    }
  };

  const colors = ['red', 'green', 'blue', 'yellow', 'orange', 'purple', 'pink', 'gray'];

  if (true) {
    return (
      <Carousel maw={600} mx="auto" slideGap="md" withIndicators height={500}>
        {images.map((image, i) => {
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
        })}
      </Carousel>
    );
  }

  if (false) {
    return (
      <>
        <Carousel
          maw={380}
          mx="auto"
          withIndicators
          loop
          slideGap="md"
          onSlideChange={setCurrentImageIndex}
        >
          {images.map((image, i) => {
            const isFile = image instanceof File;

            return (
              <Carousel.Slide key={isFile ? image.name : image._id}>
                {/* <Box sx={{ position: 'relative' }}> */}
                {/* <ActionIcon
                    onClick={() => handleDelete(image)}
                    sx={{
                      position: 'absolute',
                      right: 10,
                      top: 10,
                      background: 'white',
                      opacity: 0.8,
                      borderRadius: 999,
                    }}
                  >
                    <Icons.close />
                  </ActionIcon> */}
                <Image
                  src={isFile ? URL.createObjectURL(image) : image.url}
                  width={380}
                  height={300}
                  alt={isFile ? image.name : image.originalFileName}
                  style={{ objectFit: 'cover' }}
                />
                {/* </Box> */}
              </Carousel.Slide>
            );
          })}
        </Carousel>
        <Group position="center">
          <Button
            onClick={() => handleDelete(currentImage)}
            sx={
              {
                /* position: 'absolute', bottom: 0 */
                // transform: 'translateY(-120%)',
              }
            }
          >
            delete{' '}
          </Button>
        </Group>
      </>
    );
  }
  return (
    <Carousel
      withIndicators
      height={200}
      slideSize="33.333333%"
      slideGap="md"
      loop
      align="start"
      breakpoints={[
        { maxWidth: 'md', slideSize: '50%' },
        { maxWidth: 'sm', slideSize: '100%', slideGap: 0 },
      ]}
      //   slideSize="70%"
      //   height={200}
      //   slideGap="md"
      // withIndicators
      // height={400}
      // slideSize="33.333333%"
      // slideGap="md"
      // loop
      // align="start"
      // breakpoints={[
      //   { maxWidth: 'md', slideSize: '100%' },
      //   // { maxWidth: 'sm', slideSize: '100%', slideGap: 0 },
      // ]}
      // sx={{ display: 'flex', alignItems: 'center' }}
    >
      {images.map((image, index) => {
        const isFile = image instanceof File;
        return (
          <Fragment key={isFile ? image.name : image._id}>
            <Carousel.Slide
              key={isFile ? image.name : image._id}
              // sx={{ display: 'flex', justifyContent: 'center', background: colors[index] }}
            >
              {/* <Image
              src={isFile ? URL.createObjectURL(image) : image.url}
              width={300}
              height={200}
              alt={isFile ? image.name : image.originalFileName}
              style={{ objectFit: 'cover' }}
            /> */}
            </Carousel.Slide>
          </Fragment>
        );
      })}
    </Carousel>
  );
}

export default CrudCarousel;
