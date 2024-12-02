import React from "react";

interface AlertProps {
  message: string;
  type: "error" | "success";
}

const Alert: React.FC<AlertProps> = ({ message, type }) => {
  const alertStyles =
    type === "error"
      ? "bg-red-100 text-red-700 border-red-400"
      : "bg-green-100 text-green-700 border-green-400";

  return (
    <div className={`p-4 border-l-4 ${alertStyles} rounded mb-4`}>
      {message}
    </div>
  );
};

export default Alert;
