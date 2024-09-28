import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import InfoTempo from './components/InfoTEmpo';
import InfoTempo5Dias from './components/InfoTempo5Dias';
import './App.css';

function App() {
  const [weather, setWeather] = useState();
  const [Weather5Dias, setWeather5Dias] = useState();
  const [unit, setUnit] = useState("metric");  // Armazena a unidade (metric/imperial)
  const [city, setCity] = useState("");        // Armazena a cidade
  const [background, setBackground] = useState("#87CEEB");
  const inputRef = useRef();

  // Função para buscar os dados do tempo
  async function buscarCidade(city, unit) {
    if (!city) 
      return; // Evitar requisições sem cidade
    const key = 'b0ef0fbc5f8d19b771ab512c1881c686';
    
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=${unit}&lang=pt_br`;
    
    const url5Dias = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${key}&units=${unit}&lang=pt_br`

    try {
      const apiTempo = await axios.get(url);
      const apiInfo5Dias = await axios.get(url5Dias);
      setWeather(apiTempo.data);
      setWeather5Dias(apiInfo5Dias.data);

      // Define a cor de fundo com base na descrição do clima
      handleBackgroundColor(apiTempo.data.weather[0].description);
    } catch (error) {
      console.error("Erro ao buscar dados do tempo:", error);
      alert('Não consegui encontrar sua cidade, por favor verifique se está escrita corretamente');
    }
  }

  // Função para mudar o fundo com base na descrição do clima
  function handleBackgroundColor(description) {
    if (description.includes("céu limpo")) {
      setBackground("#87CEEB");  // Azul claro
    } else if (description.includes("nublado")) {
      setBackground("#A9A9A9");  // Cinza
    } else if (description.includes("chuva")) {
      setBackground("#4682B4");  // Azul escuro
    } else if (description.includes("fumaça")) {
      setBackground("#696969");  // Cinza escuro
      
    } else {
      setBackground("#87CEEB");  // Cor padrão para outras condições
    }
  }

  // Efeito para refazer a requisição quando a unidade mudar
  useEffect(() => {
    if (city) {
      buscarCidade(city, unit);
    }
  }, [unit]);

  // Função chamada quando o botão "Buscar" é clicado
  function handleBuscar() {
    const city = inputRef.current.value;
    setCity(city);  // Armazena a cidade no estado
    buscarCidade(city, unit);  // Faz a requisição com a unidade atual
  }

  // Função para detectar Enter pressionado
  function handleKeyPress(event) {
    if (event.key === 'Enter') {
      handleBuscar();  // Aciona a função handleBuscar ao pressionar Enter
    }
  }

  return (
    <div className="container-fluid" style={{ backgroundColor: background, minHeight: '100vh', transition: 'background-color 0.5s ease' }}>
      <div className="row">
        <h1 className="text-center mb-3">Previsão do Tempo</h1>
      </div>

      <div className="row">
        <div className="d-flex justify-content-center align-items-center">
          <input
            ref={inputRef}
            type="text"
            className="cidade"
            placeholder="Digite o nome da cidade"
            onKeyPress={handleKeyPress}
            style={{ margin: -1, width: '450px', height: '30px' }}
          />
          <button
            className="botao"
            onClick={handleBuscar}
            style={{ margin: -1, height: '30px', width: '64px' }}
          >
            Buscar
          </button>
        </div>
      </div>

      <div className="row justify-content-center mt-3">
        <select
          value={unit}
          onChange={(e) => setUnit(e.target.value)}  // Atualiza a unidade quando o usuário altera
          className="form-select text-center"
          aria-label="Default select example"
          style={{ width: '150px'}}
        >
          <option value="metric">Celsius</option>
          <option value="imperial">Fahrenheit</option>
        </select>
      </div>

      {/* Passar a unidade de temperatura como prop */}
      {weather && <InfoTempo weather={weather} unit={unit} />}
      {Weather5Dias && <InfoTempo5Dias Weather5Dias={Weather5Dias} unit={unit} />}
    </div>
  );
}

export default App;
