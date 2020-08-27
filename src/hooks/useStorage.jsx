import { useState, useEffect } from 'react';
import { projectStorage, projectFirestore, timestamp } from '../firebase/config';

const useStorage = ({ file, title = '', description = '' }) => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState();
  const [url, setUrl] = useState();

  useEffect(() => {
    if (file) {
      const storageRef = projectStorage.ref(file.name);
      const collectionRef = projectFirestore.collection('images');
      storageRef.put(file).on('state_changed', (snapshot) => {
        setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      }, (e) => {
        setError(e);
      }, async () => {
        const downloadUrl = await storageRef.getDownloadURL();
        const createdAt = timestamp();
        collectionRef.add({
          downloadUrl,
          createdAt,
          title,
          description,
        });
        setUrl(downloadUrl);
      });
    }
  }, [file, description, title]);

  return { progress, url, error };
};

export default useStorage;
