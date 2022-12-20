import React, { FormEvent, useState } from "react";
import "./Modal.scss";

interface ModalProps {
  onChange: (city: string) => void;
  isOpen: (bool: boolean) => void;
}

const Modal: React.FC<ModalProps> = (props) => {
  // * States
  const [value, setValue] = useState("");

  // * Methods
  const Submit = (e: FormEvent) => {
    e.preventDefault();
    props.onChange(value);
    CloseModal();
  };
  const CloseModal = () => props.isOpen(false);

  return (
    <div className="modal-container">
      <div className="modal">
        <div className="modal-close" onClick={CloseModal}>
          x
        </div>
        <div className="modal-title">
          <h3>Change city</h3>
        </div>
        <form onSubmit={Submit}>
          <input
            className="modal-input"
            type="text"
            placeholder="London, Amsterdam..."
            value={value}
            onChange={(e) => setValue(e.target.value)}
            autoFocus
          />
          <button className="modal-button" type="submit">
            Change
          </button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
