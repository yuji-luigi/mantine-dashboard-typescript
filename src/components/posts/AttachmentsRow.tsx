import { Group } from '@mantine/core';
import React from 'react';
import { PATH_IMAGE } from '../../lib/image-paths';
import Image from 'next/image';
import Link from 'next/link';
import { LinkedImage } from '../image/LinkedImage';

const AttachmentsRow = ({ attachments }: { attachments?: UploadModel[] }) => {
  return (
    <Group position="right">
      <Group position="right">
        <LinkedImage size={30} src={PATH_IMAGE.FILES.doc} href={PATH_IMAGE.FILES.doc} alt={'doc'} />
        <LinkedImage
          size={30}
          src={PATH_IMAGE.FILES.pdf1}
          href={PATH_IMAGE.FILES.pdf1}
          alt={'pdf1'}
        />
        <LinkedImage
          size={30}
          src={PATH_IMAGE.FILES.image}
          href={PATH_IMAGE.FILES.image}
          alt={'image'}
        />
        <LinkedImage size={30} src={PATH_IMAGE.FILES.jpg} href={PATH_IMAGE.FILES.jpg} alt={'jpg'} />
        <LinkedImage size={30} src={PATH_IMAGE.FILES.txt} href={PATH_IMAGE.FILES.txt} alt={'txt'} />
        <LinkedImage size={30} src={PATH_IMAGE.FILES.xls} href={PATH_IMAGE.FILES.xls} alt={'xls'} />
      </Group>
    </Group>
  );
};

export default AttachmentsRow;
