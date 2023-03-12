import { ActionIcon } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import React from 'react';
import { Icons } from '../../data/icons';

const CreationToolBarIconButton = ({
  formField,
  form,
}: {
  formField: FormFieldInterface;
  form: UseFormReturnType<any, any>;
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
        style={{ display: 'none' }}
        ref={inputRef}
        onChange={(event) => {
          if (event.target.files) {
            const prevFiles = form.values.media[formField.name];
            if (!prevFiles) {
              form.setFieldValue(`media.${formField.name}`, [...event.target.files]);
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
