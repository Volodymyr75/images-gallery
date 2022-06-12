import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Search from './components/Search';
import ImageCard from './components/ImageCard';
import Welcome from './components/Welcome';
import { Container, Row, Col } from 'react-bootstrap';

// const UNSPLASH_KEY = process.env.REACT_APP_UNSPLASH_KEY;
const API_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:5050';

// function App() {
const App = () => {
  const [word, setWord] = useState('');
  const [images, setImages] = useState([]);

  // console.log(images);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // console.log(e.target[0].value);
    // console.log(word);
    fetch(`${API_URL}/new-image?query=${word}`)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        // setImages([data, ...images]);
        setImages([{ ...data, title: word }, ...images]);
        // console.log(images);
      })
      .catch((err) => {
        console.log(err);
      });
    setWord('');
  };
  // console.log(word);

  // console.log(process.env.REACT_APP_UNSPLASH_KEY);
  const handleDeleteImage = (id) => {
    setImages(images.filter((image) => image.id !== id));
  };

  return (
    <div>
      <Header title="Images Gallery" />
      <Search word={word} setWord={setWord} handleSubmit={handleSearchSubmit} />
      {/* {!!images.length && <ImageCard image={images[0]} />} */}
      <Container className="mt-4">
        {images.length ? (
          <Row xs={1} md={2} lg={3}>
            {' '}
            {images.map((image, i) => (
              <Col key={i} className="pb-3">
                <ImageCard image={image} deleteImage={handleDeleteImage} />{' '}
              </Col>
            ))}{' '}
          </Row>
        ) : (
          <Welcome />
        )}
      </Container>
    </div>
  );
};

export default App;
