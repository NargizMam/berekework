import React from 'react';
import { TextField } from '@mui/material';
import { Field } from '../../shared/api/admin/types';
import FileInput from '../../shared/fileInput/FileInput';

interface Input {
  field: Field;
  index: number;
  value: string | File;
  onChange: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void;
  imageInputChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => void;
}

const InputItem: React.FC<Input> = ({
  field,
  onChange,
  index,
  imageInputChange,
  value,
}) => {
  const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    imageInputChange(e, index);
  };

  const onComponentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e, index);
  };

  switch (field.typeField) {
    case 'short-text':
      return (
        <TextField
          label={field.placeholder}
          name={field.fieldName}
          required={field.required}
          value={value}
          onChange={onComponentChange}
          fullWidth
        />
      );
    case 'long-text':
      return (
        <TextField
          label={field.placeholder}
          name={field.fieldName}
          value={value}
          required={field.required}
          onChange={onComponentChange}
          multiline
          rows={4}
          fullWidth
        />
      );
    case 'image':
      return (
        <FileInput
          label="Image"
          name="image"
          onChange={fileInputChangeHandler}
        />
      );
    default:
      console.error(`Invalid field type: ${field.typeField}`);
      return null;
  }
};

export default InputItem;
