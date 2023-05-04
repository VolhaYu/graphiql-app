import React from 'react';

interface Button {
  children: string;
  onClick: () => void;
}

function MyButton({ children, onClick }: Button) {
  return (
    <button type="submit" className="form__btn">
      {children}
    </button>
  );
}

export default MyButton;
