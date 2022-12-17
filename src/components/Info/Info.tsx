import React from "react";
import "./Info.scss";

interface InfoProps {
  isOpen: (bool: boolean) => void;
  info: any;
}

const Info: React.FC<InfoProps> = (props) => {
  const CloseModal = () => props.isOpen(false);

  return (
    <div className="info-container">
      <div className="info">
        <div className="info-close" onClick={CloseModal}>
          x
        </div>
        <div className="info-title">
          <h3>{props.info.location.name}</h3>
          <p>{props.info.location.country}</p>
        </div>
        <div className="info-main">
          <img src={props.info.current.condition.icon} alt="Condition" />
          <div className="info-condition">
            <p>{props.info.current.condition.text}</p>
            <p>
              {`${props.info.current.temp_c}ºC / ${props.info.current.temp_f}ºF`}
            </p>
          </div>
        </div>
        <div className="info-details">
          <p>
            <strong>Wind: </strong>
            {`${props.info.current.wind_kph}kph from ${props.info.current.wind_dir}`}
          </p>
          <p>
            <strong>Humidity: </strong>
            {`${props.info.current.humidity}%`}
          </p>
          <p>
            <strong>Feelslike: </strong>
            {`${props.info.current.feelslike_c}ºC / ${props.info.current.feelslike_f}ºF`}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Info;
