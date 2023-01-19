import React, { useEffect, useState } from "react";
import MenuIcon from "../../assets/img/icon-info.png";
import RefreshIcon from "../../assets/img/icon-refresh.png";
import LoaderIcon from "../../assets/img/spinner-white.png";
import { GetData, GetURL } from "../../services/services";
import Alert from "../Alert/Alert";
import Info from "../Info/Info";
import Modal from "../Modal/Modal";
import { weatherBg } from "./Weather+Helper";
import "./Weather.scss";

const Weather: React.FC = () => {
  // * States
  const [data, setData] = useState<any>();
  const [city, setCity] = useState("Madrid");
  const [isCelsius, setIsCelsius] = useState(true);
  const [open, setOpen] = useState(false);
  const [openInfo, setOpenInfo] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

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

  const GetWeatherData = async (newCity: string): Promise<any> => {
    setIsLoading(true);
    const url = GetURL(newCity);

    try {
      const res = await GetData(url);
      setData(res);
      setCity(res.location.name);
    } catch (error) {
      setTimeout(() => setIsError(true), 1000);
      setTimeout(() => setIsError(false), 10000);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  };

  const ChangeCity = (newCity: string) =>
    newCity.toUpperCase().trim() !== city.toUpperCase().trim() &&
    GetWeatherData(newCity);

  // * Life Cycle
  useEffect(() => {
    GetWeatherData(city);
  }, [city]);

  useEffect(() => {
    open
      ? document.querySelector("body")?.classList.add("body-overflow-hidden")
      : document
          .querySelector("body")
          ?.classList.remove("body-overflow-hidden");
  }, [open]);

  return (
    <>
      {open && <Modal onChange={ChangeCity} isOpen={setOpen} />}
      {openInfo && (
        <Info isOpen={setOpenInfo} info={data} isCelcius={isCelsius} />
      )}
      {isError && <Alert isOpen={setIsError} />}
      <div className="weather-container">
        <div className="weather">
          {isLoading && Loader()}
          {!isLoading && (
            <>
              <img
                className="weather-background-img"
                src={SetBackground()}
                alt="weather-background"
              />
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
                    onClick={() => GetWeatherData(city)}
                  />
                  <img
                    className="weather-menu-img"
                    src={MenuIcon}
                    alt="Refresh"
                    onClick={() => setOpenInfo(true)}
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
