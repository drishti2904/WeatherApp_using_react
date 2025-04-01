import Searchbox from "./Searchbox";
import Infobox from "./Infobox.jsx";
import { useState } from "react";
import "./Weatherapp.css";
import WbSunnyIcon from '@mui/icons-material/WbSunny';


export default function Weatherapp(){
     const [weatherInfo,setWeatherInfo]=useState({
        city:"Delhi",
        feels_like:28.17,
        humidity:34,
        temp:29.05,
        temp_max:29.05,
        temp_min:29.05,
        weather:"haze"
     });

     let updateWeatherinfo=(newInfo)=>{
        setWeatherInfo(newInfo);
     }

    return(
        <div style={{ textAlign: "center" }}>
        <h2>
            <WbSunnyIcon className="weather-icon" />
            WeatherWise
        </h2>
        <Searchbox updateWeatherinfo={updateWeatherinfo} />
        <Infobox info={weatherInfo} />
    </div>
    );s
}