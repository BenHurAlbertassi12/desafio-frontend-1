// MeuComponente.tsx
import React from 'react';
import '../style/Home.css'

interface HomeComponent {
  nome: string;
}

const Home: React.FC<HomeComponent> = ({ nome }) => {
  return (
    <div>
      <div className='container'>
        <div className='form'>
          <h3>Confira o clima de uma cidade:</h3>
          <div className='form-input-container'>
            <input
              type='text'
              placeholder='Digite o nome da cidade'
              id='city-input'
            />
            <button id='search'>
              <i className='fa-solid fa-magnifying-glass'></i>
            </button>
          </div>
        </div>
        <div id='weather-data' className='hide'>
          <h2>
            <i className='fa-solid fa-location-dot'></i> <span id='city'></span>{' '}
            <img id='country' alt='Bandeira do país'></img>
          </h2>
          <p id='temperature'>
            <span></span>&deg;C
          </p>
          <div id='description-container'>
            <p id='description'></p>
            <img id='weather-icon' src='' alt='Condições atuais' />
          </div>
          <div id='details-container'>
            <p id='umidity'>
              <i className='fa-solid fa-droplet'></i>
              <span></span>
            </p>
            <p id='wind'>
              <i className='fa-solid fa-wind'></i>
              <span></span>
            </p>
          </div>
        </div>
        <div id='error-message' className='hide'>
          <p>Não foi possível encontrar o clima de uma cidade com este nome.</p>
        </div>
        <div id='loader' className='hide'>
          <i className='fa-solid fa-spinner'></i>
        </div>
        <div id='suggestions'>
          <button id='viena'>Viena</button>
          <button id='copenhague'>Copenhague</button>
          <button id='zurique'>Zurique</button>
          <button id='vancouver'>Vancouver</button>
          <button id='genebra'>Genebra</button>
          <button id='frankfurt'>Frankfurt</button>
          <button id='osaka'>Osaka</button>
          <button id='maceio'>Maceió</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
