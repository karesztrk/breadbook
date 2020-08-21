import React, { useEffect } from 'react';
import useStorage from '../hooks/useStorage';
import { motion } from 'framer-motion';

const ProgressBar = ({ file, setFile }) => {
  const { url, progress } = useStorage(file);
  const style = {
    width: `${progress}%`,
  };
  useEffect(() => {
    if (url) {
      setFile(undefined);
    }
  }, [url, setFile]);
  return (
    <motion.div className="progress-bar" initial={{ width: 0 }} animate={style}/>
  );
};

export default ProgressBar;

