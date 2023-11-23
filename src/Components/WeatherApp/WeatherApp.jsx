import React, { useState } from "react";
import "./weatherApp.css";

import search_icon from "../Assets/search.png";
import clear_icon from "../Assets/clear.png";
import cloud_icon from "../Assets/cloud.png";
import drizzle_icon from "../Assets/drizzle.png";
import rain_icon from "../Assets/rain.png";
import snow_icon from "../Assets/snow.png";
import wind_icon from "../Assets/wind.png";
import humidity_icon from "../Assets/humidity.png";

const WeatherApp = () => {
  let apiKey = "024c94f43451c2cd059f3f0526cb071a";

  const [wicon, setWicon] = useState(cloud_icon);

  const search = async () => {
    const element = document.getElementsByClassName("cityInput");
    if (element[0].value === "") {
      return 0;
    }
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${apiKey}`;

    let res = await fetch(url);
    let data = await res.json();

    const humidity = document.getElementsByClassName("humidityPerc");
    const wind = document.getElementsByClassName("windRate");
    const temp = document.getElementsByClassName("weatherTemp");
    const loc = document.getElementsByClassName("weatherLoc");

    humidity[0].innerHTML = data.main.humidity + " %";
    wind[0].innerHTML = Math.floor(data.wind.speed) + " km/h";
    temp[0].innerHTML = Math.floor(data.main.temp) + "°С";
    loc[0].innerHTML = data.name;

    if (data.weather[0].icon === "01d" || data.weather[0].icon === "01n") {
      setWicon(clear_icon);
    } else if (
      data.weather[0].icon === "02d" ||
      data.weather[0].icon === "02n"
    ) {
      setWicon(cloud_icon);
    } else if (
      data.weather[0].icon === "03d" ||
      data.weather[0].icon === "03n"
    ) {
      setWicon(drizzle_icon);
    } else if (
      data.weather[0].icon === "04d" ||
      data.weather[0].icon === "04n"
    ) {
      setWicon(drizzle_icon);
    } else if (
      data.weather[0].icon === "09d" ||
      data.weather[0].icon === "09n"
    ) {
      setWicon(cloud_icon);
    } else if (
      data.weather[0].icon === "10d" ||
      data.weather[0].icon === "10n"
    ) {
      setWicon(snow_icon);
    } else if (
      data.weather[0].icon === "13d" ||
      data.weather[0].icon === "13n"
    ) {
      setWicon(cloud_icon);
    }
  };

  return (
    <div className="container">
      <div className="topBar">
        <input type="text" className="cityInput" placeholder="Search..." />
        <div
          className="searchIcon"
          onClick={() => {
            search();
          }}
        >
          <img src={search_icon} alt="searchIcon" />
        </div>
      </div>
      <div className="weatherImage">
        <img src={wicon} alt="weather" />
      </div>
      <div className="weatherTemp">24°С</div>
      <div className="weatherLoc">London</div>
      <div className="dataContainer">
        <div className="element">
          <img src={humidity_icon} alt="icon" className="icon" />
          <div className="data">
            <div className="humidityPerc">64%</div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className="element">
          <img src={wind_icon} alt="icon" className="icon" />
          <div className="data">
            <div className="windRate">18km/h</div>
            <div className="text">Wind Speed</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;
