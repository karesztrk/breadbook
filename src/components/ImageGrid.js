import React from 'react';
import useFirestore from '../hooks/useFirestore';
import { motion } from 'framer-motion';

const ImageGrid = ({ setSelectedImage }) => {
  const docs = useFirestore('images');
  return (
    <div className="flex flex-wrap -m-4">
      { docs && docs.map(((doc) => (
        <motion.div className="lg:w-1/3 sm:w-1/2 p-4" key={doc.id} onClick={() => setSelectedImage(doc.url)} layout whileHover={{ opacity: 1 }}>
          <div className="flex relative">
            <motion.img src={doc.url} alt="uploaded pic" className="absolute inset-0 w-full h-full object-cover object-center rounded-lg shadow-xl"
              initial={{ opacity: 0}}
              animate={{ opacity: 1}}
              transition={{ delay: 1 }}
            />
            <div className="px-8 py-10 relative z-10 w-full bg-white opacity-0 hover:opacity-100 rounded-lg">
              <h2 className="tracking-widest text-sm title-font font-medium text-indigo-500 mb-1">THE SUBTITLE</h2>
              <h1 className="title-font text-lg font-medium text-gray-900 mb-3">Shooting Stars</h1>
              <p className="leading-relaxed">Photo booth fam kinfolk cold-pressed sriracha leggings jianbing microdosing
                tousled waistcoat.</p>
            </div>
          </div>
        </motion.div>
      )))}
    </div>
  );
};

export default ImageGrid;
