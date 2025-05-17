import React from "react";
import styles from './inputcustom.module.scss'
interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string; 
}

const CustomInput: React.FC<CustomInputProps> = ({ 
  label, 
  className,
  ...props 
}) => {
  return (
    <div className={styles.inputwrapper}>
      {label && <label >{label}</label>}
      <input
        {...props}
        className={`bg-transparent w-[200px] h-8 outline-none border border-[#fff] py-3 px-4 ${className}`}
      />
    </div>
  );
};

export default CustomInput;