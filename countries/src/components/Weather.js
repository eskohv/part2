import React,{useEffect,useState} from 'react'
import axios from "axios";

const Weather = ({country}) => {
    const [weather, setWeather] = useState([])

    useEffect(() =>{
        console.log('calling API')
        const params = {
            access_key: process.env.REACT_APP_API_KEY,
            query: country.capital + " " +country.name
        }
        axios
            .get('http://api.weatherstack.com/current', {params})
            .then(response => {
                setWeather(response.data.current)
            })
    },[country])

    return (
        <div>
            <h2>Weather in {country.capital}</h2>
            <b>Temperature: </b> {weather.temperature} Celsius <br/>
            <img src={weather.weather_icons} alt=""/> <br/>
            <b>Wind: </b> {weather.wind_speed} mph direction {weather.wind_dir}
        </div>
    )
}

export default Weather