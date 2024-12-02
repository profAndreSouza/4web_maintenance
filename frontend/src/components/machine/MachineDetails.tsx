"use client";

import React, { useState } from "react";
import DetailsCard from "./DetailsCard";
import MaintenanceHistory from "./MaintenanceHistory";

interface Maintenance {
  id: string;
  date: string;
  description: string;
  technician: string;
}

interface MachineDetailsProps {
  machine: {
    id: string;
    name: string;
    type: string;
    location: string;
    model: string;
    serialNumber: string;
    manufactureDate: string;
  };
  maintenanceHistory: Maintenance[];
}

const MachineDetails: React.FC<MachineDetailsProps> = ({ machine, maintenanceHistory }) => {
  const [activeTab, setActiveTab] = useState<"general" | "maintenance">("general");

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded-md">
      {/* Tabs */}
      <div className="flex gap-4 mb-4 border-b">
        <button
          className={`p-2 font-bold ${activeTab === "general" ? "border-b-2 border-blue-500" : ""}`}
          onClick={() => setActiveTab("general")}
        >
          Informações Gerais
        </button>
        <button
          className={`p-2 font-bold ${activeTab === "maintenance" ? "border-b-2 border-blue-500" : ""}`}
          onClick={() => setActiveTab("maintenance")}
        >
          Manutenções
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === "general" && (
        <DetailsCard
          name={machine.name}
          type={machine.type}
          location={machine.location}
          model={machine.model}
          serialNumber={machine.serialNumber}
          manufactureDate={machine.manufactureDate}
        />
      )}

      {activeTab === "maintenance" && <MaintenanceHistory history={maintenanceHistory} />}
    </div>
  );
};

export default MachineDetails;
