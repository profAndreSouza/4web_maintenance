"use client";

import { Aside } from "@/components/layout/aside";
import { Footer } from "@/components/layout/footer";
import Layout from "@/components/layout/layout";
import CancelButton from "@/components/machine/CancelButton";
import InputField from "@/components/machine/InputField";
import SaveButton from "@/components/machine/SaveButton";
import TextArea from "@/components/machine/TextArea";
import React, { useState } from "react";

const MachineFormPage: React.FC = () => {
  const [machineData, setMachineData] = useState({
    name: "",
    type: "",
    model: "",
    fabricationDate: "",
    serialNumber: "",
    location: "",
    maintenanceHistory: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setMachineData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSave = () => {
    // Lógica de salvar a máquina
    console.log("Máquina salva:", machineData);
  };

  const handleCancel = () => {
    // Lógica de cancelar a edição
    console.log("Edição cancelada");
  };

  return (
    <Layout aside={<Aside />} footer={<Footer />}>
      <div className="w-4/5 mx-auto p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Editar Máquina</h2>

        <form>
          <InputField label="Nome" value={machineData.name} onChange={handleChange} name="name" placeholder="Nome da máquina" />
          <InputField label="Tipo" value={machineData.type} onChange={handleChange} name="type" placeholder="Tipo da máquina" />
          <InputField label="Modelo" value={machineData.model} onChange={handleChange} name="model" placeholder="Modelo da máquina" />
          <InputField
            label="Data de Fabricação"
            value={machineData.fabricationDate}
            onChange={handleChange}
            name="fabricationDate"
            type="date"
          />
          <InputField label="Número de Série" value={machineData.serialNumber} onChange={handleChange} name="serialNumber" placeholder="Número de série" />
          <InputField label="Localização" value={machineData.location} onChange={handleChange} name="location" placeholder="Localização da máquina" />
          <TextArea label="Histórico de Manutenção" value={machineData.maintenanceHistory} onChange={handleChange} name="maintenanceHistory" />

          <div className="flex justify-between mt-6">
            <CancelButton onClick={handleCancel} />
            <SaveButton onClick={handleSave} />
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default MachineFormPage;
