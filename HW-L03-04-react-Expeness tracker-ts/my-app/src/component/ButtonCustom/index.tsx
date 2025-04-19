import React from 'react';

interface ButtonCustomProps {
  label: string;
  onClick: () => void;
}

const Buttoncustom: React.FC<ButtonCustomProps> = ({ label, onClick }) => {
  return (
    <div>
      <button
        className="bg-gradient-to-r from-[#00838F] via-[#283593] to-[#0288D1] rounded-lg flex justify-center items-center text-white font-semibold text-md h-8 min-w-16 mt-4 px-5 py-6
        hover:bg-gradient-to-l hover:from-[#140b31] hover:to-[#453397]"
        onClick={onClick}
      >
        {label}
      </button>
    </div>
  );
};

export default Buttoncustom;