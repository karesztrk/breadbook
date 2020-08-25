import React from 'react';
import { motion } from 'framer-motion';

const ProgressBar = ({ progress }) => {
  const style = {
    width: `${progress}%`,
  };
  return (
    <motion.div className="fixed top-0 left-0 h-2 bg-indigo-600" initial={{ width: 0 }} animate={style}/>
  );
};

export default ProgressBar;

