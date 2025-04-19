import React from 'react';

interface CustomSelectedProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  label1: string;
  label2: string;
  label3: string;
  label4: string;
}

const CustomSelected: React.FC<CustomSelectedProps> = ({
  onChange,
  value,
  option1,
  option2,
  option3,
  option4,
  label1,
  label2,
  label3,
  label4,
  className,
  ...props
}) => {
  return (
    <div>
      <select
        className={`bg-white border text-black text-center py-3 outline-none px-10 ${className || ''}`}
        value={value || ""}
        onChange={onChange}
        {...props}
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