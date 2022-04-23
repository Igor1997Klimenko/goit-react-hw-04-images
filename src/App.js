import './App.css';
import imagesCard from './api';
import { useState, useEffect } from 'react'
import SearchBar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const App = () => {

  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [isModal, setIsModal] = useState(false);
  const [largeUrl, setLargeUrl] = useState('');
  const [isPending, setIsPending] = useState(false);

 const handleSubmit = async e => {
    e.preventDefault();
    setIsPending(true);
   setPage(1);
    if(query.trim() === '') {
      toast.error("Error!");
      setPage(0);
      setIsPending(false);
    }
  };
  
  const handleChange = e => {
    const { value, name } = e.target;
    switch (name) {
      case 'query':
        setQuery(value);
        break;
      
      default:
        return;
    }
  };

 const handleModal = (largeUrl) => {
   setIsModal(!isModal);
   setLargeUrl(largeUrl ? largeUrl : '');
 };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
    setIsPending(true);
  }

  useEffect(() => {
    const dataBase = async () => {
      if (isPending) {
        const images = await imagesCard(query, page);
        setImages(page > 1 ? (prev => [...prev, ...images]) : images);
        setIsPending(false);
      };
    };
    dataBase();
  }, [isPending, page, query]);

      return (
        <div className="box">
          <SearchBar onSubmit={handleSubmit} onChange={handleChange} value={query} />
          <ToastContainer />
          {!!images.length && <ImageGallery handleModal={handleModal} images={images} />}
          {isPending && <Loader />}
          {!!images.length > 0 && !isPending && <Button handleLoadMore={handleLoadMore}/>}
          {!!isModal && <Modal handleModal={handleModal} largeUrl={largeUrl}/>}
        </div>
    );
};
  
export default App;
