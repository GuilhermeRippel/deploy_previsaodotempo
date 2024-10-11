import { useState, useRef } from 'react'
import axios from 'axios'
import './App.css'
import WeatherInformations from './components/WeatherInformations'
import WeatherInformations5Days from './components/WeatherInformations5Days'

function App() {
  const cityText = useRef()
  const key = import.meta.env.VITE_KEY_API_OPENWEATHER;
  const [weather, setWeather] = useState({})
  const [weather5Days, setweather5Days] = useState({})

  async function searchCity(){
    const city = cityText.current.value
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&lang=pt_br&units=metric`
    const url5Days = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${key}&lang=pt_br&units=metric`

    const apiInfo = await axios.get(url)
    const apiInfo5Days = await axios.get(url5Days)
    setWeather(apiInfo.data)
    setweather5Days(apiInfo5Days.data)
    
  }

  return (
   <div className='font-sans bg-gradient-to-r from-sky-600 to-sky-800 h-screen w-full text-white flex flex-col items-center pt-16'>
    <h1 className='font-sans text-3xl font-bold mb-5'>Projeto Previsão do tempo</h1>
    <div>
      <input type="text" placeholder='Digite o nome da cidade' ref={cityText} className='p-3  rounded-l-2xl text-black focus:outline-none focus:border focus:border-orange-400'/>
      <button onClick={searchCity} className='bg-orange-400 h-full p-3 rounded-r-2xl'>Buscar</button>
    </div>
    <WeatherInformations weather={weather}/>
    <WeatherInformations5Days weather5Days={weather5Days}/>
   </div>
  )
}

export default App
