import React from 'react';
import R3D from '../Render3D';
import figure from './figure';

export default props => {
  return <R3D {...props} figureData={figure} />
};
