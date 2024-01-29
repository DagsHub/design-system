import React from 'react';
import './generic-card.scss';

export interface GenericCardProps {
  width: number;
  height?: number;
  backgroundImg?: string;
  elements: JSX.Element[];
}

export function GenericCard({ width, height, backgroundImg, elements }: GenericCardProps) {
  const cardStyle = {
    backgroundImage: backgroundImg ? `url(${backgroundImg})` : undefined,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    maxWidth: width,
    height: height,
  };

  return (
    <div className="generic-card-content" style={cardStyle}>
      {elements}
    </div>
  );
}
