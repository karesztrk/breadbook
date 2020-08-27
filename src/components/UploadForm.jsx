import React, { useEffect, useState } from 'react';
import ProgressBar from './ProgressBar';
import useStorage from '../hooks/useStorage';

const types = ['image/png', 'image/jpeg'];

const UploadForm = ({ className }) => {
  const [file, setFile] = useState();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState();
  const [payload, setPayload] = useState({});
  const { url, progress } = useStorage(payload);

  useEffect(() => {
    if (url) {
      setTitle('');
      setDescription('');
      setFile(undefined);
      setPayload({});
    }
  }, [url, setFile]);

  const onFileChange = (e) => {
    const [selected] = e.target.files;

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
        title,
        description,
      });
    } else {
      setError('Please select an image file');
    }
  };

  return (
    <div className={className}>
      <div
        className="lg:w-1/2 md:w-2/3 mx-auto bg-white rounded-lg p-8 flex flex-col w-full mt-10 md:mt-0 relative z-10"
      >
        <input
          className="bg-white rounded border border-gray-400 focus:outline-none focus:border-indigo-500 text-base px-4 py-2 mb-4"
          placeholder="Title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea className="bg-white rounded border border-gray-400 focus:outline-none h-32 focus:border-indigo-500 text-base px-4 py-2 mb-4 resize-none" onChange={(e) => setDescription(e.target.value)} placeholder="Recipe" value={description} />
        <input type="file" onChange={onFileChange} />
        <button
          type="button"
          onClick={onUploadClick}
          className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
        >
          Upload
        </button>
      </div>
      {error && <div className="error">{error}</div>}
      {file && <ProgressBar progress={progress} />}
    </div>
  );
};

export default UploadForm;