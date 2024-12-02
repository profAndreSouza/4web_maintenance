"use client";

import React from "react";

interface ShortcutButtonProps {
  label: string;
  onClick: () => void;
  icon?: React.ReactNode;
}

const ShortcutButton: React.FC<ShortcutButtonProps> = ({ label, onClick, icon }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center p-4 bg-indigo-600 text-white rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
    >
      {icon && <div className="mr-2">{icon}</div>}
      <span>{label}</span>
    </button>
  );
};

export default ShortcutButton;
