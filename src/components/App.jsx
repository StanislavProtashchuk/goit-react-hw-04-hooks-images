import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import Searchbar from './Searchbar';
import { Loader } from './Loader/Loader';
import API from 'services/API';
import { toast } from 'react-toastify';
import ImageGallery from './ImageGallery';
import Button from './Button';
import s from './App.module.css';

export default class App extends Component {
  state = {
    query: '',
    loader: false,
    page: 1,
    pictures: [],
    loadMore: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.state;
    if (prevState.query !== query || prevState.page !== page) {
      this.setState({ loader: true });

      API(query, page).then(pictures => {
        this.setState({ loader: false });
        if (pictures.length === 0) {
          return toast.error(`No pictures with name: "${query}". Please enter correct name and try again!`);
        }

        this.setState(prevState => ({
          pictures: [...prevState.pictures, ...pictures],
          loadMore: true,
        }));
        if (pictures.length < 12) {
          this.setState({
            loadMore: false,
          });
        }
      });
    }
  }
  handlFormSubmit = query => {
    this.setState({ query });
    this.defaultState();
  };

  onClickButton = () => {
    this.setState(prevState => {
      return {
        page: prevState.page + 1,
      };
    });
  };
  defaultState = () => {
    this.setState({ page: 1, pictures: [] });
  };

  render() {
    const { loader, pictures, loadMore } = this.state;
    return (
      <div className={s.App}>
        <Searchbar onSubmit={this.handlFormSubmit} />
        {loader && <Loader />}
        <ImageGallery pictures={pictures}></ImageGallery>
        {loadMore && <Button onClickButton={this.onClickButton} />}
        <ToastContainer autoClose={3000}/>
      </div>
    );
  }
}