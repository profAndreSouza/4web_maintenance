"use client";

import React from "react";

interface StatsCardProps {
  title: string;
  value: number;
  icon?: React.ReactNode;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon }) => {
  return (
    <div className="flex items-center p-4 bg-white shadow rounded-md">
      {icon && <div className="text-indigo-500 mr-4">{icon}</div>}
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
      </div>
    </div>
  );
};

export default StatsCard;
