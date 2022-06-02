import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import Searchbar from './Searchbar';
import { Loader } from './Loader/Loader';
import API from 'services/API';
import { toast } from 'react-toastify';
import ImageGallery from './ImageGallery';
import Button from './Button';
import s from './App.module.css';

export default function App() {

  const [query, setQuery] = useState(null);
  const [loader, setLoader] = useState(false);
  const [page, setPage] = useState(1);
  const [pictures, setPictures] = useState([]);
  const [loadMore, setLoadmore] = useState(false);

  useEffect(() => {
    if (!query) {
      return;
    }

    setLoader(true);
    API(query, page)
      .then(({ hits, totalHits }) => {
        if (hits < 12) {
          setLoadmore(false);
        }
        if (totalHits > 1) {
          setLoadmore(true);
        }
        if (hits === 0) {
          return toast.error(`No pictures with name: "${query}". Please enter correct name and try again!`);
        }
        setPictures(prevState => {
          return [...prevState, ...hits];
        });
      })
      .finally(() => {
        setLoader(false);
      });
  }, [query, page]);

  function handlFormSubmit(query) {
    setQuery(query);
    setPage(1);
    setPictures([]);
  };

  function onClickButton() {
    setPage(page => {
      return page + 1;
    })
  }
  
  return (
    <div className={s.App}>
      <Searchbar onSubmit={handlFormSubmit} />
      {loader && <Loader />}
      <ImageGallery pictures={pictures}></ImageGallery>
      {loadMore && <Button onClickButton={onClickButton} />}
      <ToastContainer autoClose={3000} />
    </div>
  );
}