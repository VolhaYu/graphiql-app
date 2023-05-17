import React from 'react';
import './ErrorMessage.scss';

interface IErrorMessage {
  message: string;
}

function ErrorMessage({ message }: IErrorMessage) {
  return (
    <div className={`error-pop-up ${message ? 'visible' : ''}`}>
      <p>{message}</p>
    </div>
  );
}

export default ErrorMessage;
