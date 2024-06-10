import React, { useRef, useState } from 'react';
import { API_URL } from '../../../app/constants/links';

interface Props {
  avatar: File | string | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FileInput: React.FC<Props> = ({ onChange, avatar }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
    }
    onChange(e);
  };

  const activateInput = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };
  return (
    <>
      <input style={{ display: 'none' }} type="file" name="avatar" onChange={onFileChange} ref={inputRef} />
      <div className="photoFrame">
        {preview ? (
          <img src={preview} alt="Preview" className="photo" />
        ) : avatar ? (
          <img className="photo" src={`${API_URL}/${avatar}`} alt="Photo" />
        ) : (
          <div className="photo"></div>
        )}
        <button className="photoBtn" onClick={activateInput}>
          +
        </button>
      </div>
    </>
  );
};

export default FileInput;
