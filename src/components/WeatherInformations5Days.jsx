import PropTypes from 'prop-types';

function WeatherInformations5Days({ weather5Days }) {
  let dailyForecast = {};

  if (weather5Days && weather5Days.list) {
    for (let forecast of weather5Days.list) {
      const date = new Date(forecast.dt * 1000).toLocaleDateString();
      if(!dailyForecast[date]){
        dailyForecast[date] = forecast
      }
    }
  } else {
    return <div className='bg-white text-black mt-5 w-1/2 text-center rounded-md'>Sem local definido para previsões</div>;
  }

  const nextFiveDays = Object.values(dailyForecast).slice(1,6)
  console.log(nextFiveDays)

  function convertDate(date){
    const newDate = new Date(date.dt * 1000).toLocaleDateString('pt-BR', {weekday: 'long', day: '2-digit'})
    return newDate
  }

  return (
    <div className='flex flex-col items-center mt-5 bg-white w-1/2 rounded-xl p-3'>
      <p className='text-xl font-bold text-black mb-2'>Previsão próximos 5 dias</p>
      <div className='flex text-black justify-around w-full'>
        {nextFiveDays.map(forecast => (
          <div key={forecast.dt} className='flex flex-col items-center'>
            <p className='font-bold capitalize'>{convertDate(forecast)}</p>
            <div className='w-16 bg-gray-400 flex items-center justify-center rounded-full'><img src={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`} alt="Ícone" /></div>
            <p className='text-lg capitalize'>{forecast.weather[0].description}</p>
            <p className='text-sm'>{Math.round(forecast.main.temp_min)}°C min / {Math.round(forecast.main.temp_max)}°C máx</p>
          </div>
        ))}
      </div>
    </div>
  );
}

WeatherInformations5Days.propTypes = {
  weather5Days: PropTypes.shape({
    list: PropTypes.arrayOf(
      PropTypes.shape({
        dt: PropTypes.number,
      })
    )
  }),
};

export default WeatherInformations5Days;
