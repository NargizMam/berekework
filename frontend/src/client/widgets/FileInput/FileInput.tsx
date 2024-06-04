import React, { useRef, useState } from 'react';
import { API_URL } from '../../../app/constants/links';

interface Props {
  photo: File | string | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FileInput: React.FC<Props> = ({ onChange, photo }) => {
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
      <input style={{ display: 'none' }} type="file" name="photo" onChange={onFileChange} ref={inputRef} />
      <div className="photoFrame">
        {preview ? (
          <img src={preview} alt="Preview" className="photo" />
        ) : photo ? (
          <img className="photo" src={`${API_URL}/${photo}`} alt="Photo" />
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
