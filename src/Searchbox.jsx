import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import "./Searchbox.css";
import { useState } from 'react';

export default function Searchbox({ updateWeatherinfo }) {
    let [city, setCity] = useState("");
    let [error, setError] = useState(false);
    
    const API_URL = "https://api.openweathermap.org/data/2.5/weather";
    const API_KEY = "cf152f4242472cb821b93d32b73088cf";

    let getWeatherinfo = async () => {
        try {
            let response = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`);
            let jsonResponse = await response.json();

            if (!response.ok) {
                throw new Error(jsonResponse.message);
            }

            let result = {
                city: city,
                temp: jsonResponse.main.temp,
                temp_min: jsonResponse.main.temp_min, 
                temp_max: jsonResponse.main.temp_max, 
                humidity: jsonResponse.main.humidity,
                feels_like: jsonResponse.main.feels_like, 
                weather: jsonResponse.weather[0].description
            };
            return result;
        } catch (error) {
            console.error("Error fetching weather data:", error);
            throw error; 
        }
    };

    let handleChange = (evt) => {
        setCity(evt.target.value);
    };

    let handleSubmit = async (evt) => {
        evt.preventDefault();
        if (!city.trim()) {
            setError(true);
            return;
        }

        try {
            setError(false);
            let newInfo = await getWeatherinfo();
            updateWeatherinfo(newInfo);
        } catch (error) {
            setError(true);
        }
        setCity(""); 
    };

    return (
        <div className="searchbox">
            <form onSubmit={handleSubmit}>
                <TextField
                    id="city"
                    label="City Name"
                    variant="filled"
                    required
                    value={city}
                    onChange={handleChange}
                />
                <br /><br />
                <Button variant="contained" type="submit">
                    Search
                </Button>
                {error && <p style={{ color: "red" }}>No such place exists!</p>}
            </form>
        </div>
    );
}
