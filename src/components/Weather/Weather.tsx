import React, { useState, useEffect } from "react";
import "./Weather.scss";
import axios from "axios";
import { weatherBg } from "./Weather+Helper";
import Modal from "../Modal/Modal";
import LoaderIcon from "../../assets/img/spinner-white.png";
import RefreshIcon from "../../assets/img/icon-refresh.png";
import MenuIcon from "../../assets/img/icon-menu.png";

const Weather: React.FC = () => {
  // * States
  const [data, setData] = useState<any>();
  const [isCelsius, setIsCelsius] = useState(true);
  const [city, setCity] = useState("MADRID");
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // * Methods
  const SetBackground = () => {
    const temp = Number(data.current.temp_c);
    if (temp >= 18) return weatherBg.Sun;
    if (temp > 3 && temp < 18) return weatherBg.Rain;
    return weatherBg.Snow;
  };

  const Loader = () => (
    <div className="weather-loader">
      <img className="weather-loader-img" src={LoaderIcon} alt="Loader" />
    </div>
  );

  const GetWeatherData = async (): Promise<any> => {
    setIsLoading(true);
    const url = `${process.env.REACT_APP_URL}key=${process.env.REACT_APP_KEY}&q=${city}&aqi=no`;
    const res = await axios.get(url);
    setData(res.data);
    setTimeout(async () => {
      setIsLoading(false);
    }, 1000);
  };

  // * Life Cycle
  useEffect(() => {
    GetWeatherData();
  }, [city]);

  useEffect(() => console.log(data), [data]);
  useEffect(() => {
    open
      ? document.querySelector("body")?.classList.add("body-overflow-hidden")
      : document
          .querySelector("body")
          ?.classList.remove("body-overflow-hidden");
  }, [open]);

  return (
    <>
      {open && <Modal onChange={setCity} isOpen={setOpen} />}
      <div className="weather-container">
        <div className="weather">
          {isLoading && Loader()}
          {!isLoading && (
            <>
              <div className="weather-background">
                <img
                  className="weather-background-img"
                  src={SetBackground()}
                  alt="weather-background"
                />
              </div>
              <div className="weather-top">
                <div className="weather-date">
                  <div className="weather-day">
                    <p>{data.location.localtime.split(" ")[0]}</p>
                  </div>
                  <div className="weather-time">
                    <p>{data.location.localtime.split(" ")[1]}</p>
                  </div>
                </div>
                <div className="weather-menu">
                  <img
                    className="weather-menu-img"
                    src={RefreshIcon}
                    alt="Refresh"
                    onClick={GetWeatherData}
                  />
                  <img
                    className="weather-menu-img"
                    src={MenuIcon}
                    alt="Refresh"
                  />
                </div>
              </div>

              <div className="weather-info">
                <div className="weather-city" onClick={() => setOpen(true)}>
                  <h2>{city}</h2>
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
    </>
  );
};

export default Weather;
