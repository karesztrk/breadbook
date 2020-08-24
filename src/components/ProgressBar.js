import React from 'react';
import { motion } from 'framer-motion';

const ProgressBar = ({ progress }) => {
  const style = {
    width: `${progress}%`,
  };
  return (
    <motion.div className="progress-bar" initial={{ width: 0 }} animate={style}/>
  );
};

export default ProgressBar;

