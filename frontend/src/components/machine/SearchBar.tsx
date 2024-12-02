"use client";

import React, { useState } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <div className="flex items-center gap-4 p-4 bg-white shadow rounded-md">
      <input
        type="text"
        placeholder="Buscar por nome, tipo ou localização..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <button
        onClick={handleSearch}
        className="p-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        Buscar
      </button>
    </div>
  );
};

export default SearchBar;
