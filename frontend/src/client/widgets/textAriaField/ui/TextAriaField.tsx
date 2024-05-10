import { SxProps, Theme, Typography } from '@mui/material';
import React, { useState } from 'react';

interface Props {
  labelTitle: string;
  labelClassName: string;
  fieldClassName: string;
  name: string;
  value: string;
  onChange: (name: string, value: string) => void;
  minSub: number;
  sx: SxProps<Theme>;
  required?: boolean;
  changeFlag: (name: string, flag: boolean) => void;
}

const TextAriaField: React.FC<Props> = ({
  labelTitle,
  labelClassName,
  fieldClassName,
  name,
  value,
  onChange,
  minSub,
  sx,
  required = false,
  changeFlag,
}) => {
  const [error, setError] = useState<string | null>();
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (value.length < minSub) {
      changeFlag(name, true);
      setError(`Минимум ${minSub}`);
    }
    if (value.length >= minSub) {
      changeFlag(name, false);
      setError(null);
    }
    if (value.length === 0) {
      setError(null);
    }
    onChange(name, value);
  };
  return (
    <div>
      <label className={labelClassName} htmlFor={name}>
        <Typography sx={sx}>{labelTitle}</Typography>
      </label>
      <textarea
        className={fieldClassName}
        id={name}
        name={name}
        onChange={handleChange}
        value={value}
        required={required}
      ></textarea>
      <span>{error}</span>
    </div>
  );
};

export default TextAriaField;
