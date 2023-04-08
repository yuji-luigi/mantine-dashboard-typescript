import { ActionIcon } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import React from 'react';
import { Icons } from '../../data/icons';
import { UseFormReturnTypeCustom } from './input_interfaces/useForm_interface';

const CreationToolBarIconButton = ({
  formField,
  form,
}: {
  formField: FormFieldInterface;
  form: UseFormReturnTypeCustom;
}) => {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleSelectFile = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };
  return (
    <>
      <input
        type="file"
        multiple={formField.multi}
        accept={formField.accept}
        // capture="filesystem"
        // capture="environment"
        style={{ display: 'none' }}
        ref={inputRef}
        onChange={(event) => {
          if (event.target.files) {
            // what is prevFiles?
            const prevFiles = form.values.media?.[formField.name];
            // const prevFilePreviews = form.values.mediaPreview?.[formField.name];
            if (!prevFiles?.length) {
              const filesUrl = [];
              // for of loop
              for (const file of event.target.files) {
                filesUrl.push(URL.createObjectURL(file));
              }

              // should be FileList, need to handle for existing values from DB
              form.setFieldValue(`media.${formField.name}`, [...event.target.files]);

              // string of image urls.
              // getting also existing values from DB
              // form.setFieldValue(`mediaPreview.${formField.name}`, [...event.target.files]);
              return;
            }
            form.setFieldValue(`media.${formField.name}`, [...prevFiles, ...event.target.files]);
          }
        }}
      />
      <ActionIcon onClick={handleSelectFile}>
        {formField.type === 'image' && <Icons.photo />}
        {formField.type === 'attachment' && <Icons.paperclip />}
      </ActionIcon>
    </>
  );
};

export default CreationToolBarIconButton;
