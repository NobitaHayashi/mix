import React from 'react';

export const Select = ({ options, value, onChange }) => {
  return (
    <select value={value} onChange={onChange}>
      {options.map((option, index) => <option key={index} value={option.value}>{option.label}</option>)}
    </select>
  );
}