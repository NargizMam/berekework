import React from 'react';
import { TextField } from '@mui/material';
import { Field } from '../../page/adminPages/model/types';
import ImageUpload from '../../shared/imageUpload/imageUpload';

interface Input {
  field: Field;
  index: number;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void;
  imageInputChange: (location: string, index: number) => void;
}

const InputItem: React.FC<Input> = ({ field, onChange, index, imageInputChange, value }) => {
  const onComponentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e, index);
  };

  const onImageChange = (imageLoc: string) => {
    console.log('ON CHANGE: ', imageLoc);
    imageInputChange(imageLoc, index);
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
        <ImageUpload onChangeImage={onImageChange} value={value ? value.split('&')[1] + '.' + value.slice(-3) : ''} />
      );
    default:
      console.error(`Invalid field type: ${field.typeField}`);
      return null;
  }
};

export default InputItem;
