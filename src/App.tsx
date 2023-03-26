import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Main } from './pages/Main/Main';
import { Favorites } from './pages/Favorites/Favorites';
import { Header } from './components/Header/Header';
import { NameTheCountry } from './pages/NameTheCountry/NameTheCountry';
import { useAppDispatch } from './store/hooks';
import { fetchCountries } from './store/middlewareThunk/fetchCountries';
import './App.scss';

const App: React.FC = () => {
 const dispatch = useAppDispatch();


//Обращение к API, получение данных и диспатчинг их в стор
 useEffect(() => {
    dispatch(fetchCountries())
}, [dispatch])

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/found-country" element={<NameTheCountry />} />
      </Routes>
    </div>

  );
}

export default App;
