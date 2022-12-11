import React, { useState, useEffect } from "react";
import "./Weather.scss";
import axios from "axios";
import { weatherBg } from "./Weather+Helper";

interface WeatherProps {
  city: string;
}

const Weather: React.FC<WeatherProps> = (props) => {
  // * States
  const [data, setData] = useState<any>();
  const [isCelsius, setIsCelsius] = useState(true);

  // * Methods
  const SetBackground = () => {
    const temp = Number(data.current.temp_c);
    if (temp >= 20) return weatherBg.Sun;
    if (temp > 5 && temp < 20) return weatherBg.Rain;
    return weatherBg.Snow;
  };

  const Loader = () => (
    <div className="weather-loader">
      <img
        className="weather-loader-img"
        src="https://i.imgur.com/l8D5JlD.png"
        alt="Loader"
      />
    </div>
  );

  // * Life Cycle
  useEffect(() => {
    const GetWeatherData = async (): Promise<any> => {
      const url = `${process.env.REACT_APP_URL}key=${process.env.REACT_APP_KEY}&q=${props.city}&aqi=no`;
      const res = await axios.get(url);
      //   setTimeout(() => setData(res.data), 30000);
      setData(res.data);
    };
    GetWeatherData();
  }, []);

  useEffect(() => console.log(data), [data]);

  return (
    <div className="weather-container">
      <div className="weather">
        {!data && Loader()}
        {data && (
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
                <p>{data.location.localtime.split(" ")[0]}</p>
              </div>
              <div className="weather-time">
                <p>{data.location.localtime.split(" ")[1]}</p>
              </div>
            </div>

            <div className="weather-info">
              <div className="weather-city">
                <h2>{props.city}</h2>
              </div>

              <div
                className="weather-temp"
                onClick={() => setIsCelsius(!isCelsius)}
              >
                <h1>
                  {isCelsius
                    ? `${data.current.temp_c}ºC`
                    : `${data.current.temp_f}ºF`}
                </h1>
              </div>
            </div>
            <div className="weather-msg">
              <p>Developed by Emanuel</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Weather;
