import React, { useEffect } from 'react';
import { TextField } from '@mui/material';
import { useAppSelector } from '../../../app/store/hooks';
import { selectImageLocation } from '../../page/adminPages/model/imageUploadSlice';
import { Field } from '../../page/adminPages/model/types';
import ImageUpload from '../../shared/imageUpload/imageUpload';

interface Input {
  field: Field;
  index: number;
  value: string | File;
  onChange: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void;
  imageInputChange: (location: string, index: number) => void;
}

const InputItem: React.FC<Input> = ({ field, onChange, index, imageInputChange, value }) => {
  const imageLocation = useAppSelector(selectImageLocation);

  useEffect(() => {
    imageInputChange(imageLocation, index);
  }, [imageLocation, imageInputChange, index]);

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
      return <ImageUpload name={'image'} />;
    default:
      console.error(`Invalid field type: ${field.typeField}`);
      return null;
  }
};

export default InputItem;