import React from 'react';
import Image from 'next/image';
import { Group, Stack, Text } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';

interface Prop {
  form: UseFormReturnTypeWithMedia;
  formField: FormFieldInterface;
}
const PreviewFileZone = ({ form, formField }: Prop) => {
  const files = form.values.media?.[formField?.name || ''] || [];
  if (!files.length) {
    return null;
  }
  return (
    <Stack mt={10} spacing={0}>
      <Text mb={0} size="md" weight={500}>
        {formField?.label}
      </Text>
      <Group sx={{ border: 'solid #C1C2C5 1px', borderRadius: 4 }}>
        {!!files.length &&
          files.map((file) => (
            <Image
              key={file.name}
              src={URL.createObjectURL(file)}
              alt={file.name}
              style={{ objectFit: 'contain' }}
              width="150"
              height="150"
            />
          ))}
      </Group>
    </Stack>
  );
};

export default PreviewFileZone;
