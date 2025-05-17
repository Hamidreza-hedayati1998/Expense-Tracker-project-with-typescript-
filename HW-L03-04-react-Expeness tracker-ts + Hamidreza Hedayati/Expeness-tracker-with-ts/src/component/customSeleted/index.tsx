import React, { ChangeEventHandler } from 'react';
import styles from './customselected.module.scss'
interface CustomSelectedProps {
  onChange: ChangeEventHandler<HTMLSelectElement>;
  value?: string;
  option1: string;
  option2: string;
  option3: string;
  label1: string;
  label2: string;
  label3: string;
  option4: string;
  label4: string;
}

const CustomSelected: React.FC<CustomSelectedProps> = ({
  onChange,
  value,
  option1,
  option2,
  option3,
  label1,
  label2,
  label3,
  option4,
  label4
}) => {
  return (
    <div>
      <select 
        className={styles.selectStyle} 
        value={value || ""}
        onChange={onChange}
      >
        <option value={option1}>{label1}</option>
        <option value={option2}>{label2}</option>
        <option value={option3}>{label3}</option>
        <option value={option4}>{label4}</option>
      </select>
    </div>
  );
};

export default CustomSelected;