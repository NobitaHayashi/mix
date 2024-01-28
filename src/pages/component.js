import React from 'react';
import Basic from './component/basic';
import { Mouse } from './component/form/mouse';

export default function ComponentPage({title}) {
  return (
    <>
      <h1>{title}</h1>
      <Mouse></Mouse>
    </>
  )
}