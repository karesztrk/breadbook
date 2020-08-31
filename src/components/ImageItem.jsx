import React, { useCallback, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Ingredients from './Ingredients';

const ingredients = [
  {
    name: 'Kovász',
    type: 'starter',
    quantity: 100,
  },
  {
    name: 'Víz',
    type: 'liquid',
    quantity: 330,
  },
  {
    name: 'Só',
    type: 'salt',
    quantity: 10,
  },
  {
    name: 'TK liszt',
    type: 'flour',
    quantity: 50,
  },
  {
    name: 'Finomliszt',
    type: 'flour',
    quantity: 150,
  },
  {
    name: 'Rétesliszt',
    type: 'flour',
    quantity: 300,
  },
];
const ImageItem = ({ item, onCloseClick }) => {
  const {
    id, url, title, description,
  } = item;
  const ref = useRef();
  const onClickOutside = useCallback((e) => {
    if (ref && ref.current && !ref.current.contains(e.target)) {
      onCloseClick();
    }
  }, [onCloseClick]);
  const onKeyPress = useCallback((e) => {
    if (e.key === 'Escape') {
      onCloseClick();
    }
  }, [onCloseClick]);
  useEffect(() => {
    window.addEventListener('keyup', onKeyPress);
    window.addEventListener('mousedown', onClickOutside);
    return () => {
      window.removeEventListener('keyup', onKeyPress);
      window.removeEventListener('mousedown', onClickOutside);
    };
  }, [onKeyPress, onClickOutside]);
  return (
    <motion.div className="w-full h-full inset-0 z-50 fixed p-16 bg-black bg-opacity-75 overflow-hidden">
      <motion.div ref={ref} className="relative rounded-xl w-full h-full mx-auto my-0 bg-gray-900 max-w-3xl overflow-hidden text-gray-500 body-font" layoutId={`card-container-${id}`}>
        <motion.div className="t-0 left-0 w-full h-1/3" layoutId={`card-image-container-${id}`}>
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
        <Ingredients data={ingredients} />
      </motion.div>
    </motion.div>
  );
};

export default ImageItem;
