import { Carousel } from '@mantine/carousel';
import { Box } from '@mantine/core';
import Image from 'next/image';
// import { Image } from '@mantine/core';

function CarouselBasic({ images }: { images: Upload[] | [] }) {
  if (!images.length) {
    return null;
  }
  return (
    <Carousel
      withIndicators
      height={200}
      slideSize="33.333333%"
      slideGap="md"
      loop
      align="center"
      breakpoints={[
        { maxWidth: 'md', slideSize: '50%' },
        { maxWidth: 'sm', slideSize: '100%', slideGap: 0 },
      ]}
    >
      {images.map((image) => (
        <Carousel.Slide key={image._id} sx={{ display: 'flex', justifyContent: 'center' }}>
          <Image
            src={image.url}
            width={300}
            height={200}
            alt={image.originalFileName}
            style={{ objectFit: 'cover' }}
          />
        </Carousel.Slide>
      ))}
    </Carousel>
  );
}

export default CarouselBasic;
