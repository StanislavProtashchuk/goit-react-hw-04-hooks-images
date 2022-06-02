import s from './ImageGalleryItem.module.css'

export default function ImageGalleryItem({ pictures, showModal }) {
  return pictures.map(({ id, webformatURL, tags, largeImageURL }) => {
    return (
      <li className={s.ImageGalleryItem} key={id}>
        <img
          className={s.ImageGalleryItemImage}
          src={webformatURL}
          alt={tags}
          onClick={() => showModal(largeImageURL)}
        />
      </li>
    );
  });
}