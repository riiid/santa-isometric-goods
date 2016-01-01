import React from 'react';
import R2D from '../Render2D';
import figure from './figure';

export default props => {
  return <R2D {...props} figureData={figure} />
};
