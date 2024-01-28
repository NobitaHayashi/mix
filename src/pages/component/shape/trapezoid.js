import React from 'react';

export const Trapezoid = ({ topWidth, bottomWidth, height, color }) => {
  if(bottomWidth > topWidth) {
    return (
      <svg height={height} width={bottomWidth}>
        <polygon points={`${(bottomWidth - topWidth) / 2},0 ${(bottomWidth + topWidth) / 2},0 ${bottomWidth},${height} 0,${height}`} style={{fill: color}} />
      </svg>
    );
  } else {
    return (
      <svg height={height} width={topWidth}>
        <polygon points={`0,0 ${topWidth},0 ${(topWidth + bottomWidth) / 2},${height} ${(topWidth - bottomWidth) / 2},${height} `} style={{fill: color}} />
      </svg>
    );
  }
  
}

