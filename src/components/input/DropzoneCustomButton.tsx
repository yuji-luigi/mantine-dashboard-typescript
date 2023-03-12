import { useRef, useState } from 'react';
import { Box, Button, Group, Text } from '@mantine/core';
import { Dropzone } from '@mantine/dropzone';
import { UseFormReturnType } from '@mantine/form';
import Image from 'next/image';

interface Props {
  form: UseFormReturnType<Record<string, unknown>>;
  formField: FormFieldInterface;
}

export function DropzoneCustomButton({ form, formField }: Props) {
  const openRef = useRef<() => void>(null);
  const [files, setFiles] = useState<File[]>([]);

  const handleDropFile = (newFiles: File[]) => {
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    form.setFieldValue(`dropzone.${formField.name}`, newFiles[0]);
    form.setFieldValue(`preview.${formField.name}`, URL.createObjectURL(newFiles[0]));
  };
  return (
    <Box mt={10}>
      <Text size="md" weight={500}>
        {formField.label}
      </Text>
      <Dropzone
        openRef={openRef}
        onDrop={handleDropFile}
        activateOnClick={false}
        styles={{ inner: { pointerEvents: 'all' } }}
      >
        {!!files.length &&
          files.map((file) => (
            <Image
              key={file.name}
              src={URL.createObjectURL(file)}
              alt={file.name}
              width="150"
              height="150"
            />
          ))}
        <Group position="right" my={8}>
          <Button onClick={() => openRef.current?.()}>Select files</Button>
        </Group>
      </Dropzone>
    </Box>
  );
}
