"use client";

import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const handlePrevious = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  return (
    <div className="flex justify-center items-center gap-4 p-4">
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className={`p-2 rounded ${
          currentPage === 1 ? "bg-gray-300" : "bg-indigo-600 text-white hover:bg-indigo-700"
        }`}
      >
        Anterior
      </button>
      <span>
        Página {currentPage} de {totalPages}
      </span>
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className={`p-2 rounded ${
          currentPage === totalPages ? "bg-gray-300" : "bg-indigo-600 text-white hover:bg-indigo-700"
        }`}
      >
        Próximo
      </button>
    </div>
  );
};

export default Pagination;
