import React, { useEffect, useState } from 'react';
import ProgressBar from './ProgressBar';
import useStorage from '../hooks/useStorage';

const types = ['image/png', 'image/jpeg'];

const UploadForm = () => {

  const [file, setFile] = useState();
  const [description, setDescription] = useState();
  const [error, setError] = useState();
  const { url, progress } = useStorage(file, description);

  useEffect(() => {
    if (url) {
      setFile(undefined);
    }
  }, [url, setFile]);

  const onFileChange = (e) => {
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
      <textarea onChange={(e) => setDescription(e.target.value)} />
      <label>
        <input type="file" onChange={onFileChange} />
      </label>
      <div className="output">
        {error && <div className="error">{error}</div>}
        {file && <div>{file.name}</div>}
        {file && <ProgressBar progress={progress} />}
      </div>
    </form>
  );
};

export default UploadForm;
