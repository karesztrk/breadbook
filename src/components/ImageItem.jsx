import React from 'react';
import { motion } from 'framer-motion';

const ImageItem = ({ item, onOverlayClick }) => {
  const {
    id, url, title, description,
  } = item;
  return (
    <motion.div
      className="w-full h-full inset-0 z-50 fixed p-16 bg-black bg-opacity-75 overflow-hidden"
      onClick={onOverlayClick}
    >
      <motion.div className="relative rounded-xl w-full h-full mx-auto my-0 bg-gray-900 max-w-3xl overflow-hidden text-gray-500 body-font" layoutId={`card-container-${id}`}>
        <motion.div
          className="t-0 left-0 w-full h-1/3"
          layoutId={`card-image-container-${id}`}
        >
          <motion.img
            className="w-full h-full object-cover"
            src={url}
            alt="Header"
            animate={{ scale: 1, y: 0 }}
            layoutId={`card-image-${id}`}
          />
        </motion.div>
        <div className="title-container">
          <motion.h2 className="sm:text-3xl text-2xl title-font font-medium text-white my-4 mx-8" layoutId={`card-title-${id}`}>{title}</motion.h2>
          <motion.p className="leading-relaxed mb-8 my-4 mx-8" layoutId={`card-description-${id}`}>
            {description}
          </motion.p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ImageItem;
