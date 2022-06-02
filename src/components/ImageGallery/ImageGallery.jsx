import ImageGalleryItem from 'components/ImageGalleryItem';
import { useState, useEffect } from 'react';
import s from './ImageGallery.module.css'
import Modal from '../Modal';

export default function ImageGallery({pictures}) {
  
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState(null);

  function handleKeyDown(e) {
    if (e.code === 'Escape') {
      setShowModal(false);
    }
  };
  
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
  }, []);

  function handleModal(largeImageURL) {
    setShowModal(true);
    setLargeImageURL(largeImageURL);
  };

  function closeModal(e) {
    if (e.target === e.currentTarget) {
      setShowModal(false);
    };
  };
  
  return (
      <ul className={s.ImageGallery}>
        <ImageGalleryItem
          pictures={pictures}
          showModal={handleModal}
        />
        {showModal && (
          <Modal
            bigPicture={largeImageURL}
            closeModal={closeModal}
          />
        )}
      </ul>
    );
  }