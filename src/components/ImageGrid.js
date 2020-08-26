import React, { useState } from 'react';
import useFirestore from '../hooks/useFirestore';
import { motion } from 'framer-motion';

const imageAnimation = {
  hovered: { y: -75, scale: 0.75 },
  unHovered: { y: 0, scale: 1 },
};

const detailsAnimation = {
  hovered: { scaleX: 1.05, scaleY: 1.5 },
  unHovered: { scaleX: 1, scaleY: 1 },
};

const ImageGrid = () => {
  const docs = useFirestore('images');
  const [hovered, setHovered] = useState();
  const renderImage = (doc) => {
    const imageHovered = hovered === doc.id;
    return (
      <motion.div className="p-4 h-full w-full" key={doc.id} layout onMouseEnter={() => setHovered(doc.id)} onMouseLeave={(() => setHovered(undefined))}>
        <div className="relative h-full w-full">
          <motion.img src={doc.url} alt="uploaded pic" className="absolute inset-0 w-full h-full object-cover object-center rounded-lg z-20"
                      animate={imageHovered ? 'hovered' : 'unHovered'} variants={imageAnimation}
          />
          {imageHovered && (
            <div className="absolute z-10 w-full h-full flex flex-col items-center justify-end">
              <h2 className="tracking-widest text-sm title-font font-medium text-indigo-500 mb-1 uppercase">{doc.title}</h2>
              <p className="leading-relaxed">{doc.description}</p>
            </div>
          )}
          <motion.div className="w-30 h-56 relative z-0 w-full bg-white rounded-lg shadow-xl"
                      animate={imageHovered ? 'hovered' : 'unHovered'} variants={detailsAnimation} />
        </div>
      </motion.div>
    );
  };

  return (
    <div className="grid grid-cols-3">
      { docs && docs.map((doc) => renderImage(doc)) }
    </div>
  );
};

export default ImageGrid;
