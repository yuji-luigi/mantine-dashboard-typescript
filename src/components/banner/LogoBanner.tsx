import React from 'react';
import Image from 'next/image';

interface LogoBannerProps {
  transparent?: boolean;
  src?: string;
  alt?: string;
  width?: number | null;
  height?: number | null;
}

const LOGO_PATH = {
  black: '/images/flatmates_logo_banner_copy.jpeg',
  transparent: '/images/flatmates_logo_banner.png',
};

export function LogoBanner({
  transparent = false,
  src = '',
  alt = '',
  width = null,
  height = null,
}: LogoBannerProps) {
  return (
    <Image
      src={src || transparent ? LOGO_PATH.transparent : LOGO_PATH.black}
      alt={alt || 'flate mates logo'}
      width={width || 200}
      height={height || 50}
      priority
    />
  );
}
