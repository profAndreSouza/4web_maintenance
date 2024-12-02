import React from "react";

interface CancelButtonProps {
  onClick: () => void;
}

const CancelButton: React.FC<CancelButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-full sm:w-auto px-6 py-2 bg-gray-300 text-gray-700 font-semibold rounded-md shadow-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
    >
      Cancelar
    </button>
  );
};

export default CancelButton;
