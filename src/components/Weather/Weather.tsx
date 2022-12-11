import React, { useState, useEffect } from "react";
import "./Weather.scss";
import axios from "axios";

interface WeatherProps {
  city: string;
}

const Weather: React.FC<WeatherProps> = (props) => {
  // * States
  const [state, setState] = useState<any>();

  // * Methods
  const SetBackground = () => {
    const temp = Number(state.current.temp_c);
    if (temp > 20)
      return "https://media0.giphy.com/media/5K4WeEfVwG6tWl0FBW/giphy.gif?cid=790b7611d5c9ca58dadfaecb719a8f2d20974846cbcb9050&rid=giphy.gif&ct=g";
    return "https://media3.giphy.com/media/cnL3XuYJy9WJYiLGMY/giphy.gif";
  };

  // * Life Cycle
  useEffect(() => {
    const GetWeatherData = async (): Promise<any> => {
      const url = `${process.env.REACT_APP_URL}key=${process.env.REACT_APP_KEY}&q=${props.city}&aqi=no`;
      const res = await axios.get(url);
      setState(res.data);
    };
    GetWeatherData();
  }, []);

  useEffect(() => console.log(state), [state]);

  return (
    <div className="weather">
      {state && (
        <>
          <div className="weather-background">
            <img
              className="weather-background-img"
              src={SetBackground()}
              alt="weather-background"
            />
          </div>
          <div className="weather-date">
            <div className="weather-day">
              <p>{state.location.localtime.split(" ")[0]}</p>
            </div>
            <div className="weather-time">
              <p>{state.location.localtime.split(" ")[1]}</p>
            </div>
          </div>
        </>
      )}
      <div className="weather-info">
        <div className="weather-city">
          <h3>{props.city}</h3>
        </div>
        {state ? (
          <div className="weather-temp">
            <h1>{state.current.temp_c}ºC</h1>
          </div>
        ) : (
          <h1>Loading...</h1>
        )}
      </div>
      <div className="weather-msg">
        <p>Developed by Emanuel</p>
      </div>
    </div>
  );
};

export default Weather;
