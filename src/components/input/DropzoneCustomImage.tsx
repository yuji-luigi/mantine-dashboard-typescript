import { Group, Text, useMantineTheme, rem, Button, Box } from '@mantine/core';
import { IconUpload, IconPhoto, IconX } from '@tabler/icons-react';
import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { UseFormReturnType } from '@mantine/form';
import { useRef, useState } from 'react';
import { Carousel } from '@mantine/carousel';
import Image from 'next/image';

interface Props extends Partial<DropzoneProps> {
  form: UseFormReturnType<Record<string, unknown>>;
  formField: FormFieldInterface;
}

export function DropzoneCustomImage(props: Props) {
  const theme = useMantineTheme();
  const { form, formField } = props;
  const [files, setFiles] = useState<File[]>([]);
  const openRef = useRef<() => void>(null);

  const handleDropFile = (newFiles: File[]) => {
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    form.setFieldValue(`dropzone.${formField.name}`, newFiles);
    form.setFieldValue(`preview.${formField.name}`, files);
  };

  return (
    <>
      <Text size="md" weight={500}>
        {formField.label}
      </Text>
      <Dropzone
        openRef={openRef}
        activateOnClick={!files.length}
        onDrop={handleDropFile}
        multiple={formField?.multi}
        onReject={(files) => console.log('rejected files', files)}
        maxSize={3 * 1024 ** 2}
        accept={IMAGE_MIME_TYPE}
        {...props}
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
        <Group
          position="center"
          spacing="xl"
          style={{ maxHeight: rem(220), pointerEvents: 'none' }}
        >
          <Dropzone.Accept>
            <IconUpload
              size="3.2rem"
              stroke={1.5}
              color={theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 4 : 6]}
            />
          </Dropzone.Accept>
          <Dropzone.Reject>
            <IconX
              size="3.2rem"
              stroke={1.5}
              color={theme.colors.red[theme.colorScheme === 'dark' ? 4 : 6]}
            />
          </Dropzone.Reject>

          <div>
            {!files.length && (
              <>
                <Dropzone.Idle>
                  <IconPhoto size="3.2rem" stroke={1.5} />
                </Dropzone.Idle>
                <Text size="xl" inline>
                  Drag images here or click to select files
                </Text>
                <Text size="sm" color="dimmed" inline mt={7}>
                  Attach as many files as you like, each file should not exceed 5mb
                </Text>
              </>
            )}
          </div>
        </Group>
      </Dropzone>
      <Group position="right" mt={5}>
        <Button onClick={() => openRef.current?.()}>Select files</Button>
      </Group>
    </>
  );
}
