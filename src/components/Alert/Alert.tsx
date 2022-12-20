import React from "react";
import "./Alert.scss";
import AlertIcon from "../../assets/img/icon-alert.png";

interface AlertProps {
  isOpen: (bool: boolean) => void;
}

const Info: React.FC<AlertProps> = (props) => {
  const CloseAlert = () => props.isOpen(false);

  return (
    <div className="alert-container">
      <div className="alert">
        <div className="alert-close" onClick={CloseAlert}>
          x
        </div>
        <div className="alert-divider" />
        <img className="alert-icon" src={AlertIcon} alt="Alert" />
        <div className="alert-message">
          <div className="alert-message-title">
            <p>Uh oh, something went wrong :(</p>
          </div>
          <div className="alert-message-text">
            <p>There was a problem with your request. Please try again! </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Info;
