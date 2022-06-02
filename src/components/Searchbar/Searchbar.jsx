import { useState } from 'react';
import { toast } from 'react-toastify';
import s from './Searchbar.module.css'

export default function Searchbar({onSubmit}) {
  const [query, setQuery] = useState('');


  function handleQueryChange(e) {
    setQuery(e.currentTarget.value.toLowerCase());
  };

  function handleSubmit(e) {
    e.preventDefault();
    if (query.trim() === '') {
      return toast.error('Please enter picture name');
    }
    onSubmit(query);
    setQuery('');
  };

  return (
    <header className={s.Searchbar}>
      <form className={s.SearchForm} onSubmit={handleSubmit}>
        <button className={s.SearchFormButton} type="submit">
          <span className={s.SearchFormButtonLabel}></span>
        </button>
      
        <input
          className={s.SearchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          value={query}
          placeholder="Search images and photos"
          onChange={handleQueryChange}
        />
      </form>
    </header>
  );
};