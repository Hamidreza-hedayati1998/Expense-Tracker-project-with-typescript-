import React, { MouseEvent } from 'react';
import styles from './button.module.scss'
interface ButtonCustomProps {
  label: string;
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
}

const Buttoncustom: React.FC<ButtonCustomProps> = ({ label, onClick }) => {
  return (
    <div>
      <button
        className={styles.btn}
        onClick={onClick}
      >
        {label}
      </button>
    </div>
  );
};

export default Buttoncustom;