import { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Search from './components/Search';
import ImageCard from './components/ImageCard';
import Welcome from './components/Welcome';
import Spinner from './components/Spinner';
import { Container, Row, Col } from 'react-bootstrap';

// const UNSPLASH_KEY = process.env.REACT_APP_UNSPLASH_KEY;
const API_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:5050';

// function App() {
const App = () => {
  const [word, setWord] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  // console.log(images);
  // const getSavedImages = async () => {
  //   try {
  //     const res = await axios.get(`${API_URL}/images`);
  //     setImages(res.data || []);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => getSavedImages(), []);

  useEffect(() => {
    (async function () {
      try {
        const res = await axios.get(`${API_URL}/images`);
        setImages(res.data || []);
        setLoading(false);
        toast.success('Saved images downloaded');
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    })();
  }, []);

  const handleSearchSubmit = async (e) => {
    //add async for axios
    e.preventDefault();
    // console.log(e.target[0].value);
    // console.log(word);
    // fetch(`${API_URL}/new-image?query=${word}`);
    //   .then((res) => res.json())
    //   .then((data) => {
    //     // console.log(data);
    //     // setImages([data, ...images]);
    //     setImages([{ ...data, title: word }, ...images]);
    //     // console.log(images);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });

    try {
      const res = await axios.get(`${API_URL}/new-image?query=${word}`);
      // console.log(res.data);
      setImages([
        {
          ...res.data,
          title: word,
        },
        ...images,
      ]);
      toast.info(`New image ${word.toUpperCase()} was found`);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }

    setWord('');
  };
  // console.log(word);

  // console.log(process.env.REACT_APP_UNSPLASH_KEY);
  // const handleDeleteImage = (id) => {
  //   setImages(images.filter((image) => image.id !== id));
  // };
  const handleDeleteImage = async (id) => {
    try {
      const res = await axios.delete(`${API_URL}/images/${id}`);
      // console.log(res.data);
      // if (res.data?.deleted_id) {}  its his condition
      if (res.status === 200) {
        toast.warn(
          `Image ${images
            .find((i) => i.id === id)
            .title.toUpperCase()} was deleted`
        );
        setImages(images.filter((image) => image.id !== id));
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const handleSaveImage = async (id) => {
    const imageToBeSaved = images.find((image) => image.id === id);
    imageToBeSaved.saved = true;

    try {
      const res = await axios.post(`${API_URL}/images`, imageToBeSaved);
      if (res.data?.inserted_id) {
        setImages(
          images.map((image) =>
            image.id === id ? { ...image, saved: true } : image
          )
        );
        toast.info(`Image ${imageToBeSaved.title.toUpperCase()} was saved`);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div>
      <Header title="Images Gallery" />
      {loading ? (
        <Spinner />
      ) : (
        <>
          <Search
            word={word}
            setWord={setWord}
            handleSubmit={handleSearchSubmit}
          />{' '}
          {/* {!!images.length && <ImageCard image={images[0]} />} */}{' '}
          <Container className="mt-4">
            {' '}
            {images.length ? (
              <Row xs={1} md={2} lg={3}>
                {' '}
                {images.map((image, i) => (
                  <Col key={i} className="pb-3">
                    <ImageCard
                      image={image}
                      deleteImage={handleDeleteImage}
                      saveImage={handleSaveImage}
                    />{' '}
                  </Col>
                ))}{' '}
              </Row>
            ) : (
              <Welcome />
            )}{' '}
          </Container>
        </>
      )}
      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default App;
