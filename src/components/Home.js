import React, { useState } from 'react';
import ImageGrid from './ImageGrid';

const Home = () => {
  const [selectedImage, setSelectedImage] = useState();
  {/*{ selectedImage && <Modal selectedImage={selectedImage } setSelectedImage={setSelectedImage} /> }*/}
  return (
    <ImageGrid setSelectedImage={setSelectedImage} />
  );
};

export default Home;
