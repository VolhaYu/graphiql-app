/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';

interface Input {
  type: string;
  placeholder: string;
  label: string;
  onChange: (e: React.SyntheticEvent<HTMLInputElement>) => void;
}
function MyInput({ label, type, placeholder, onChange }: Input) {
  return (
    <label>
      {' '}
      {label}
      <input className="form__input" type={type} placeholder={placeholder} onChange={onChange} />
    </label>
  );
}

export default MyInput;
