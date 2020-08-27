import React, { useState } from 'react';
import { motion } from 'framer-motion';
import useFirestore from '../hooks/useFirestore';

const itemAnimation = {
  hovered: { zIndex: 100 },
  unHovered: { zIndex: 1 },
};

const imageAnimation = {
  hovered: { y: -75, scale: 0.75 },
  unHovered: { y: 0, scale: 1 },
};

const backgroundAnimation = {
  hovered: { scaleX: 1.05, scaleY: 1.5 },
  unHovered: { scaleX: 1, scaleY: 1 },
};

const ImageGrid = () => {
  const docs = useFirestore('images');
  const [hovered, setHovered] = useState();
  const renderImage = (doc) => {
    const itemHovered = hovered === doc.id;
    return (
      <motion.div
        className="p-4 h-full w-full"
        key={doc.id}
        layout
        onHoverStart={() => setHovered(doc.id)}
        onHoverEnd={() => setHovered(undefined)}
        animate={itemHovered ? 'hovered' : 'unHovered'}
        variants={itemAnimation}
      >
        <div className="relative w-30 h-56 ">
          <motion.img
            src={doc.url}
            alt="uploaded pic"
            className="absolute inset-0 w-full h-full object-cover object-center rounded-lg z-20"
            animate={itemHovered ? 'hovered' : 'unHovered'}
            variants={imageAnimation}
          />
          {itemHovered && (
            <div className="absolute z-10 w-full h-full flex flex-col items-center justify-end transform translate-y-5">
              <h2
                className="tracking-widest text-sm title-font font-medium text-indigo-500 mb-1 uppercase"
              >
                {doc.title}
              </h2>
              <p className="hidden lg:block leading-relaxed text-sm text-center">{doc.description}</p>
            </div>
          )}
          <motion.div
            className="absolute w-full h-full z-0 bg-white rounded-lg shadow-xl"
            animate={itemHovered ? 'hovered' : 'unHovered'}
            variants={backgroundAnimation}
          />
        </div>
      </motion.div>
    );
  };

  return (
    <div className="grid grid-cols-3">
      {docs && docs.map((doc) => renderImage(doc))}
    </div>
  );
};

export default ImageGrid;
