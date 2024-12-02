"use client";

import React from "react";
import Link from "next/link";

interface Machine {
  id: string;
  name: string;
  type: string;
  location: string;
  model: string;
}

interface MachineTableProps {
  machines: Machine[];
}

const MachineTable: React.FC<MachineTableProps> = ({ machines }) => {
  return (
    <div className="overflow-x-auto bg-white shadow rounded-md">
      <table className="min-w-full border-collapse table-auto">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-4 text-left">Nome</th>
            <th className="p-4 text-left">Tipo</th>
            <th className="p-4 text-left">Localização</th>
            <th className="p-4 text-left">Modelo</th>
            <th className="p-4 text-left">Ações</th>
          </tr>
        </thead>
        <tbody>
          {machines.map((machine) => (
            <tr key={machine.id} className="hover:bg-gray-100">
              <td className="p-4">{machine.name}</td>
              <td className="p-4">{machine.type}</td>
              <td className="p-4">{machine.location}</td>
              <td className="p-4">{machine.model}</td>
              <td className="p-4 flex gap-2">
                <Link
                  href={`/machine/${machine.id}`}
                  className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Ver Detalhes
                </Link>
                <Link
                  href={`/machine/${machine.id}/edit`}
                  className="p-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Editar
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MachineTable;
