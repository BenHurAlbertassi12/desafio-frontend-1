import React, { useState } from 'react';
import '../style/Home.css';

const apiKey = process.env.REACT_APP_API_KEY;

interface WeatherData {
  name: string;
  main: {
    temp: number;
    humidity: number;
  };
  weather: {
    description: string;
    icon: string;
  }[];
  sys: {
    country: string;
  };
  wind: {
    speed: number;
  };
}

const Home: React.FC = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const toggleLoader = () => {
    setIsLoading((prevState) => !prevState);
  };

  const getWeatherData = async (city: string) => {
    toggleLoader();

    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;

    try {
      const res = await fetch(apiWeatherURL);
      const data = await res.json();

      toggleLoader();

      return data;
    } catch (error) {
      toggleLoader();
      setErrorMessage('Ocorreu um erro ao obter os dados de clima.');
      return null;
    }
  };

  const showErrorMessage = () => {
    setErrorMessage('Não foi possível encontrar o clima da cidade.');
  };

  const hideInformation = () => {
    setErrorMessage('');
    setWeatherData(null);
  };

  const showWeatherData = async (city: string) => {
    hideInformation();

    const data = await getWeatherData(city);

    if (data && data.cod === '404') {
      showErrorMessage();
      return;
    }

    setWeatherData(data);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    showWeatherData(city);
  };

  return (
    <div>
      <div className='container'>
        <div className='form'>
          <h3>Confira o clima de uma cidade:</h3>
          <div className='form-input-container'>
            <input
              type='text'
              placeholder='Digite o nome da cidade'
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <button id='search' onClick={handleSearch}>
              <i className='fa-solid fa-magnifying-glass'></i>
            </button>
          </div>
        </div>
        {weatherData && weatherData.sys && (
          <div id='weather-data'>
            <h2>
              <i className='fa-solid fa-location-dot'></i> {weatherData.name}{' '}
              {weatherData.sys.country}
            </h2>
            <div id='weather-info-container'>
              <div id='temperature-container'>
                <p id='temperature'>{Math.round(weatherData.main.temp)}°C</p>
                <p id='description'>{weatherData.weather[0].description}</p>
              </div>
              <div id='weather-icon-container'>
                <img
                  id='weather-icon'
                  src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
                  alt='Condições atuais'
                />
              </div>
              <div id='details-container'>
                <p id='umidity'>
                  <i className='fa-solid fa-droplet'></i>
                  <span>{weatherData.main.humidity}%</span>
                </p>
                <p id='wind'>
                  <i className='fa-solid fa-wind'></i>
                  <span>{weatherData.wind.speed}km/h</span>
                </p>
              </div>
            </div>
          </div>
        )}
        {errorMessage && (
          <div id='error-message'>
            <p>{errorMessage}</p>
          </div>
        )}
        {isLoading && (
          <div id='loader'>
            <i className='fa-solid fa-spinner'></i>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
