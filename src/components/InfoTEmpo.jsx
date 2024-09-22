import './InfoTempo.css'
function InfoTempo({ weather, unit }) {
  
    return (
      <div className="container-weather" style={{marginTop: '30px'}}>
        <h2 className="cidade text-center">{weather.name}</h2>
        <div className="container-img img-fluid d-flex justify-content-center">
          <img 
              src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} 
              alt="Ícone do clima" 
          />
          <p className="temperatura" style={
            {marginTop: '5px'}
            }> 
            {Math.round(weather.main.temp)}
            {unit === "metric" ? "°C" : "°F"}
        </p>  
        </div>
        
        <p className="descrição text-center">{weather.weather[0].description}</p>

        <div className="container-info">
          <p className="sensacao-termica">Sensação térmica: {Math.round(weather.main.feels_like)}
              {unit === "metric" ? "°C" : "°F"}
          </p>
          <p className="umidade">Umidade: {weather.main.humidity}%</p>
          <p className="pressao">Pressão: {weather.main.pressure} hPa</p>
        </div>
      </div>
    );
  }
  
  export default InfoTempo;
  