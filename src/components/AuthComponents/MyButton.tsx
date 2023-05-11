import React from 'react';

interface Button {
  children: string;
}

function MyButton({ children }: Button) {
  return (
    <button type="submit" className="form__btn">
      {children}
    </button>
  );
}

export default MyButton;
