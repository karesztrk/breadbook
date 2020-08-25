import React, { useEffect, useState } from 'react';
import ProgressBar from './ProgressBar';
import useStorage from '../hooks/useStorage';

const types = ['image/png', 'image/jpeg'];

const UploadForm = () => {

  const [file, setFile] = useState();
  const [description, setDescription] = useState();
  const [error, setError] = useState();
  const [payload, setPayload] = useState({});
  const { url, progress } = useStorage(payload);

  useEffect(() => {
    if (url) {
      setFile(undefined);
      setPayload({});
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

  const onUploadClick = () => {
    if (file) {
      setPayload({
        file,
        description
      });
    } else {
      setError('Please select an image file')
    }
  };

  return (
    <div>
      <div
        className="lg:w-1/2 md:w-2/3 mx-auto bg-white rounded-lg p-8 flex flex-col w-full mt-10 md:mt-0 relative z-10">
        <textarea className="bg-white rounded border border-gray-400 focus:outline-none h-32 focus:border-indigo-500 text-base px-4 py-2 mb-4 resize-none" onChange={(e) => setDescription(e.target.value)} placeholder="Recipe"/>
        <input type="file" onChange={onFileChange} />
        <button onClick={onUploadClick} className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">
          Upload
        </button>
      </div>
      {error && <div className="error">{error}</div>}
      {file && <ProgressBar progress={progress} />}
    </div>
  );
};

export default UploadForm;
