import './InfoTempo5Dias.css'
function InfoTempo5Dias ({ Weather5Dias, unit }) {

    let listClima = {}

    for (let forecast of Weather5Dias.list) {
        const date =new Date(forecast.dt * 1000).toLocaleDateString()
        if (!listClima[date]) {
            listClima[date] = forecast
        }
    }

    const next5Days = Object.values(listClima).slice(1,6)

    function converterData(date) {
        const newDate = new Date(date.dt * 1000).toLocaleDateString('pt-BR', { weekday: 'long' })

        return newDate

    }

    return (
        <div className="container-weather-mini" style={{marginTop: '30px'}}>
            <div className='titulo-container text-center'>
                <h3 className='titulo'>Previsão do tempo para os próximos 5 Dias</h3>
            </div>
            <div className='listClima'>
                {next5Days.map(forecast => (
                    <div className='detalhes' key= {forecast.dt}>
                        <p className="diaSemana">{converterData(forecast)}</p>
                        <img src={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`}></img>
                        <p className="descrição">{forecast.weather[0].description}</p>
                        <p className="min-max">{Math.round(forecast.main.temp_min)}{unit === "metric" ? "°C" : "°F"} min / 
                            {Math.round(forecast.main.temp_min)}{unit === "metric" ? "°C" : "°F"} max </p>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default InfoTempo5Dias