import React from "react";

interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string; 
}

const CustomInput: React.FC<CustomInputProps> = ({ 
  label, 
  className,
  ...props 
}) => {
  return (
    <div className="flex flex-col my-3">
      {label && <label className="text-white text-lg">{label}</label>}
      <input
        {...props}
        className={`bg-transparent w-[200px] h-8 outline-none border border-[#fff] py-3 px-4 ${className}`}
      />
    </div>
  );
};

export default CustomInput;