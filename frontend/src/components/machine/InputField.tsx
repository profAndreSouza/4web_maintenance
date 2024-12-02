import React from "react";

interface InputFieldProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string; // Tipo de campo, ex: texto, número, etc.
  placeholder?: string;
}

const InputField: React.FC<InputFieldProps> = ({ label, value, onChange, type = "text", placeholder }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
    </div>
  );
};

export default InputField;
