import React from 'react';
import { motion } from 'framer-motion';

const Modal = ({ selectedImage, setSelectedImage }) => {

  const onClick = (e) => {
    if (e.target.classList.contains('backdrop')) {
      setSelectedImage(undefined);
    }
  };

  return (
    <motion.div className="backdrop" onClick={onClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.img src={selectedImage} alt="enlarged-pic" />
    </motion.div>
  );
};

export default Modal;
