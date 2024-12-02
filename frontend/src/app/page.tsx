"use client";

import { Aside } from "@/components/layout/aside";
import NotificationList from "@/components/dashboard/NotificationList";
import ShortcutButton from "@/components/dashboard/ShortcutButton";
import StatsCard from "@/components/dashboard/StatsCard";
import { Footer } from "@/components/layout/footer";
import React from "react";
import { AiOutlinePlus, AiOutlineSetting, AiOutlineWarning } from "react-icons/ai";
import Layout from "@/components/layout/layout";

const DashboardPage: React.FC = () => {
  const stats = [
    { title: "Máquinas Registradas", value: 150 },
    { title: "Manutenções Pendentes", value: 12 },
    { title: "Peças em Estoque", value: 45 },
  ];

  const shortcuts = [
    { label: "Adicionar Máquina", onClick: () => alert("Adicionar Máquina"), icon: <AiOutlinePlus /> },
    { label: "Criar Solicitação de Manutenção", onClick: () => alert("Criar Solicitação"), icon: <AiOutlineSetting /> },
  ];

  const notifications = [
    { id: "1", message: "Manutenção atrasada na máquina #123", type: "warning" },
    { id: "2", message: "Nova máquina registrada: Máquina #456", type: "info" },
    { id: "3", message: "Peças críticas no estoque!", type: "error" },
  ];

  return (
    <Layout aside={<Aside />} footer={<Footer />}>
      
      
      <div className="min-h-screen bg-gray-100 p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>

        {/* Estatísticas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {stats.map((stat, index) => (
            <StatsCard key={index} title={stat.title} value={stat.value} />
          ))}
        </div>

        {/* Atalhos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {shortcuts.map((shortcut, index) => (
            <ShortcutButton
              key={index}
              label={shortcut.label}
              onClick={shortcut.onClick}
              icon={shortcut.icon}
            />
          ))}
        </div>

        {/* Notificações */}
        <NotificationList notifications={notifications} />
      </div>

    </Layout>
   
  );
};

export default DashboardPage;


