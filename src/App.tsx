import { useEffect, FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Main } from './pages/Main/Main';
import { Favorites } from './pages/Favorites/Favorites';
import { Header } from './components/Header/Header';
import { NameTheCountry } from './pages/NameTheCountry/NameTheCountry';
import { useAppDispatch } from './store/hooks';
import { fetchCountries } from './store/middlewareThunk/fetchCountries';
import { Footer } from './components/Footer/Footer';
import background from './assets/jpg/background.jpg';
import videoBackgroundApp from './assets/webm/videoBackground.webm';
import styles from './App.module.scss';


const App:FC = () => {
  const dispatch = useAppDispatch();

  //Обращение к API, получение данных и диспатчинг их в стор
  useEffect(() => {
    dispatch(fetchCountries())
  }, [dispatch])



  return (
    <div className={styles.app}>
      <div className={styles.backgroundApp}><img src={background} alt='' /></div>
      <div className={styles.videoBackgroundApp}>
        <video autoPlay muted loop>
          <source src={videoBackgroundApp} type='video/webm'/>
        </video>
      </div>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/found-country" element={<NameTheCountry />} />
      </Routes>
      <Footer />

    </div>

  );
}

export default App;
