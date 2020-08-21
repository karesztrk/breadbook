import React, { useState } from 'react';
import ProgressBar from './ProgressBar';

const types = ['image/png', 'image/jpeg'];

const UploadForm = () => {

  const [file, setFile] = useState();
  const [error, setError] = useState();

  const onChange = (e) => {
    let [selected] = e.target.files;

    if (selected && types.includes(selected.type)) {
      setFile(selected);
      setError(undefined);
    } else {
      setFile(undefined);
      setError('Please select an image file (png or jpeg)');
    }
  };

  return (
    <form>
      <label>
        <input type="file" onChange={onChange} />
        <span>+</span>
      </label>
      <div className="output">
        {error && <div className="error">{error}</div>}
        {file && <div>{file.name}</div>}
        {file && <ProgressBar file={file} setFile={setFile} />}
      </div>
    </form>
  );
};

export default UploadForm;
