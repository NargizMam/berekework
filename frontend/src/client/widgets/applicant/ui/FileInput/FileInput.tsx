import React, { useRef } from 'react';

interface Props {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FileInput: React.FC<Props> = ({onChange}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e);
  };

  const activateInput = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  return (
    <>
      <input
        style={{display: 'none'}}
        type="file"
        name={'photo'}
        onChange={onFileChange}
        ref={inputRef}
      />

      <div className="photoFrame">
        <div className="photo"></div>
        <button className="photoBtn" onClick={activateInput}>+</button>
      </div>
    </>
  );
};

export default FileInput;