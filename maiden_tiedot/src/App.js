import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Country = ({country, setNewFilter}) => {
  return (
    <p> {country.name.common} <Button handleClick={() => setNewFilter(country.name.common)} text="show" /></p>
  )
}

const Weather = ({weather}) => {
  return (
    <div>
      <p> temperature: {weather.current.temperature} Celcius</p>
      <img src={weather.current.weather_icons[0]} width="100" />
      <p> wind: {weather.current.wind_speed} m/s direction {weather.current.wind_dir} </p>
    </div>
  )
}

const Language = ({language}) => {
  return (
    <li>{language}</li> 
  )
}

const SingleCountry = ({country, weather, setCity}) => {
  const lang = country.languages
  var langu = []
  for (var key of Object.keys(lang)) {
    langu = langu.concat(lang[key]);
  }
  useEffect(() => {
    setCity(country.capital)
  },[]);
  return (
    <>
      <h1> {country.name.common}</h1>
      <p>capital {country.capital}</p> 
      <p>area {country.area}</p>
      <h2>languages</h2>
      <ul>
        {langu.map(lang => <Language key={lang} language={lang} />)}
      </ul>
      <img src={country.flags.png} width="200" />
      <h2>Weather in {country.capital}</h2>
      <div>
        <Weather weather = {weather}/>
      </div>
    </>
  )
}

const Filter = (props) => {
  const newFilter = props.newFilter
  const handleFilterChange = props.handleFilterChange
  return (
    <form>
    <div>
      find countries: <input value = {newFilter}
      onChange = {handleFilterChange} />
    </div>
  </form>
  )
}

const Countries = (props) => {
  const weather = props.weather
  const setCity = props.setCity
  const countries = props.countries
  const newFilter = props.newFilter
  const setNewFilter = props.setNewFilter
  const countriesToShow =
  countries.filter(country => country.name.common.toLowerCase().includes(newFilter.toLowerCase()))
  if (countriesToShow.length>10) {
    return (
      <div>Too many matches, specify another filter</div>
    )
  } else if (countriesToShow.length>1) {
    return (
      <div>
        {countriesToShow.map(country => 
        <Country key = {country.name.common} country={country} setNewFilter = {setNewFilter}/>
        )}
      </div>
    )
  }
  return (
    <>
      {countriesToShow.map(country => 
      <SingleCountry Country key = {country.name.common} country={country} weather = {weather} setCity= {setCity} />
      )}
    </>
  )
}

const App = () => {
  const [newFilter, setNewFilter] = useState('')
  const [countries, setCountries] = useState([])
  const [weather, setWeather] = useState()
  const [city, setCity] = useState('Sava')
  const api_key = process.env.REACT_APP_API_KEY

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  useEffect(() => {
    axios
      .get('http://api.weatherstack.com/current?access_key=' + api_key + '&query=' + city)
      .then(response => {
        setWeather(response.data)
      })
  }, [city])

  return (
    <div>
        <Filter newFilter = {newFilter} handleFilterChange = {handleFilterChange} />
        <Countries countries = {countries} newFilter = {newFilter} setNewFilter = {setNewFilter} 
        weather = {weather} setCity = {setCity}/>
    </div>
  )

}

export default App
