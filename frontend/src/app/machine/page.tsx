"use client";

import { Aside } from "@/components/layout/aside";
import { Footer } from "@/components/layout/footer";
import Layout from "@/components/layout/layout";
import MachineTable from "@/components/machine/MachineTable";
import Pagination from "@/components/machine/Pagination";
import SearchBar from "@/components/machine/SearchBar";
import React, { useState } from "react";

const MachinesPage: React.FC = () => {
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5; // Exemplo de total de páginas.

  const machines = [
    { id: "1", name: "Máquina A", type: "Tipo 1", location: "Local 1", model: "Modelo X" },
    { id: "2", name: "Máquina B", type: "Tipo 2", location: "Local 2", model: "Modelo Y" },
  ];

  const handleSearch = (query: string) => {
    setQuery(query);
    console.log("Buscando por:", query);
  };

  const handleViewDetails = (id: string) => {
    console.log("Visualizar detalhes da máquina:", id);
  };

  const handleEdit = (id: string) => {
    console.log("Editar máquina:", id);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    console.log("Mudando para página:", page);
  };

  return (
    <Layout aside={<Aside />} footer={<Footer />}>
        <div className="p-6 space-y-6">
        <SearchBar onSearch={handleSearch} />
        <MachineTable machines={machines} onViewDetails={handleViewDetails} onEdit={handleEdit} />
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </div>
    </Layout>
  );
};

export default MachinesPage;
