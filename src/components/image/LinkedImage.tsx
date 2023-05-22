import Link from 'next/link';
import Image from 'next/image';

// Create a new component that wraps an Image in a Link
export const LinkedImage = ({
  src = '',
  href = '',
  alt = '',
  width = 0,
  height = 0,
  size,
}: {
  src: string;
  href: string;
  alt?: string;
  width?: number;
  height?: number;
  size?: number;
}) => {
  return (
    <Link href={href}>
      <Image src={src} width={size || width} height={size || height} alt={alt} />
    </Link>
  );
};
