import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import useFirestore from '../hooks/useFirestore';
import ImageItem from './ImageItem';

const itemAnimation = {
  hovered: { zIndex: 40 },
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
  const [loaded, setLoaded] = useState(false);
  const [selected, setSelected] = useState();

  useEffect(() => {
    if (docs.length > 0) {
      const preload = docs.map((doc) => new Promise((resolve, reject) => {
        const image = new Image();
        image.src = doc.url;
        image.onload = resolve();
        image.onerror = reject();
      }));
      Promise.all(preload).then(() => setLoaded(true));
    }
  }, [docs]);

  const onItemClick = (doc) => {
    setHovered(undefined);
    setSelected(doc);
  };

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
        onClick={() => onItemClick(doc)}
        layoutId={`card-container-${doc.id}`}
      >
        <div className="relative w-30 h-56 cursor-pointer">
          <motion.img
            src={doc.url}
            alt={doc.title}
            className="absolute inset-0 w-full h-full object-cover object-center rounded-lg z-20"
            animate={itemHovered ? 'hovered' : 'unHovered'}
            variants={imageAnimation}
            onLoad={() => setLoaded(true)}
            layoutId={`card-image-${doc.id}`}
          />
          {itemHovered && (
            <div
              className="absolute z-10 w-full h-full flex flex-col items-center justify-end transform translate-y-5"
            >
              <motion.h2 className="ttitle-font text-lg font-medium text-gray-900 mb-3 uppercase" layoutId={`card-title-${doc.id}`}>
                {doc.title}
              </motion.h2>
            </div>
          )}
          <motion.div
            className="absolute w-full h-full z-0 bg-white rounded-lg shadow-2xl"
            animate={itemHovered ? 'hovered' : 'unHovered'}
            variants={backgroundAnimation}
          />
        </div>
      </motion.div>
    );
  };

  return (
    <>
      <div className="grid grid-cols-3">
        {loaded && docs.map((doc) => renderImage(doc))}
      </div>
      {!loaded && <div>Loading...</div>}
      {selected && (
        <AnimatePresence>
          <ImageItem
            item={selected}
            onCloseClick={() => setSelected(undefined)}
            key="item"
          />
        </AnimatePresence>
      )}
    </>
  );
};

export default ImageGrid;
