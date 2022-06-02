import s from './Modal.module.css'

export default function Modal({ bigPicture, closeModal }) {
  return (
    <div className={s.Overlay} onClick={closeModal}>
      <div>
        <img className={s.Modal} src={bigPicture} alt="modal" />
      </div>
    </div>
  );
}