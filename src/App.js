import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Weather from './components/Weather'

export default function App() { 
  const [weather, setWeather] = useState([]);
  const [formInputs, updateFormInputs] = useState({
    time: '',
    week: '',
    location: '',
    
  });
  const getWeather = async () => {
    try {
      const response = await fetch('http://localhost:3000/weathers');
      const data = await response.json();
      setWeather(data)
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(
    () => {
      (
        async function () {
          await getWeather();
        }
      )()
    }, [])
  const handleChange = (event) => {
    const updatedFormInputs = Object.assign({}, formInputs, { [event.target.id]: event.target.value })
    updateFormInputs(updatedFormInputs);
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:3000/weathers',
        formInputs
      );
      const createdWeather = response.data
      await updateFormInputs({
        time: '',
        week: '',
        location: '',
      })
      await setWeather([createdWeather, ...weather])
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <div className="App">
      <div className="column">
        <nav>
          <h4>Weather</h4>
          <form onSubmit={handleSubmit}>
            <label htmlFor="time">Time:</label>
            <input
              type="text"
              id="time"
              onChange={handleChange}
              value={formInputs.time}
            />
            <label htmlFor="gender">Week</label>
            <input
              type="text"
              id="week"
              onChange={handleChange}
              value={formInputs.week}
            />
            <label htmlFor="location">Location:</label>
            <input
              type="text"
              id="location"
              onChange={handleChange}
              value={formInputs.location}
            />
            <input type="submit" className="submit" />
          </form>
        </nav>
        <main>
          <Weather weather={weather} />
        </main>
        <aside>
        </aside>
      </div>

      <footer />
    </div>
  );
}
