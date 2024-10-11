import PropTypes from 'prop-types';

function WeatherInformations({ weather = {} }) {
  const hasWeather = weather.weather && weather.weather[0];

  if (!weather.name || !hasWeather) {
    return <div className='bg-white text-black mt-5 w-1/2 text-center rounded-md'>Sem local definido para informações</div>;
  }

  return (
    <div className='bg-white flex flex-col gap-3 items-center p-3 shadow-2xl mt-5 w-1/2 rounded-md'>
      <h2 className='text-black text-xl font-bold'>{weather.name}</h2>
      <div className='bg-gray-400 w-24 flex flex-col items-center rounded-full'>
        <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} alt="Ícone" />
        <p className='text-black'>{Math.round(weather.main.temp)}°C</p>
        </div>
        <p className='text-black font-bold text-lg capitalize'>{weather.weather[0].description}</p>
      <div className='flex justify-around w-full'>
        <p className='text-black'><span className='font-bold'>Sensação Térmica:</span> {Math.round(weather.main.feels_like)}°C</p>
        <p className='text-black'><span className='font-bold'>Umidade:</span> {weather.main.humidity}%</p>
        <p className='text-black'><span className='font-bold'>Pressão:</span> {weather.main.pressure}</p>
      </div>
    </div>
  );
}

WeatherInformations.propTypes = {
  weather: PropTypes.shape({
    name: PropTypes.string,
    weather: PropTypes.arrayOf(
      PropTypes.shape({
        icon: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
      })
    ),
    main: PropTypes.shape({
      temp: PropTypes.number,
    }),
  }),
};

export default WeatherInformations;
