import { Aside } from "@/components/layout/aside";
import { Footer } from "@/components/layout/footer";
import Layout from "@/components/layout/layout";
import MachineDetails from "@/components/machine/MachineDetails";

const MachineDetailsPage = () => {
  const machine = {
    id: "1",
    name: "Máquina A",
    type: "Tipo 1",
    location: "Setor 1",
    model: "Modelo X",
    serialNumber: "12345XYZ",
    manufactureDate: "2022-01-01",
  };

  const maintenanceHistory = [
    {
      id: "1",
      date: "2023-05-10",
      description: "Troca de filtro",
      technician: "Carlos Silva",
    },
    {
      id: "2",
      date: "2023-06-15",
      description: "Revisão geral",
      technician: "Ana Souza",
    },
  ];

  return (
    <Layout aside={<Aside />} footer={<Footer />}>
        <MachineDetails machine={machine} maintenanceHistory={maintenanceHistory} />
    </Layout>
  );
};

export default MachineDetailsPage;
