import React from 'react';

export const Search = ({ value, onChange }) => {
  return (
    <input type="search" value={value} onChange={onChange} />
  );
}