import React, { useEffect, useRef, useState } from 'react';
import { Carousel } from '@mantine/carousel';
import { Box } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import Image from 'next/image';

function CarouselBasic({ images }: { images: File[] | UploadModel[] }) {
  const myRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    setWidth(myRef.current?.offsetWidth || 0);

    const handleResize = () => {
      setWidth(myRef.current?.offsetWidth || 0);
    };

    window.addEventListener('resize', handleResize);

    // Clean up function
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); //
  const isLargeScreen = width > 800;
  if (!images.length) {
    return null;
  }

  const isMulti = images.length > 1;
  const gt2 = images.length > 2;
  const scrollBy = isLargeScreen && gt2 ? 3 : 1;
  return (
    <Box ref={myRef}>
      <Carousel
        withIndicators={isMulti}
        height={200}
        mx="auto"
        slideSize="33.333333%"
        slideGap="md"
        slidesToScroll={scrollBy}
        loop={isMulti}
        align="center"
        initialSlide={gt2 ? 1 : 0}
        breakpoints={[
          { maxWidth: 'md', slideSize: '50%' },
          { maxWidth: 'sm', slideSize: '100%', slideGap: 0 },
          { maxWidth: 'sm', slideSize: '100%', slideGap: 0 },
        ]}
      >
        {images.map((image) => {
          const isFile = image instanceof File;

          return (
            <Carousel.Slide
              key={isFile ? image.name : image._id}
              sx={{ display: 'flex', justifyContent: 'center' }}
            >
              <Image
                src={isFile ? URL.createObjectURL(image) : image.url}
                width={280}
                height={200}
                alt={isFile ? image.name : image.originalFileName}
                style={{ objectFit: 'cover' }}
              />
            </Carousel.Slide>
          );
        })}
      </Carousel>
    </Box>
  );
}

export default CarouselBasic;
