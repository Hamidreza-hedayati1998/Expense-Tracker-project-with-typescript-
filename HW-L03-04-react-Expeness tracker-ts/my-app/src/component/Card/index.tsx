import React from 'react';
import style from './card.module.scss';

interface CardProps {
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ children }) => {
  return (
    <div className={style.conatiner}>
      {children}
    </div>
  );
};

export default Card;