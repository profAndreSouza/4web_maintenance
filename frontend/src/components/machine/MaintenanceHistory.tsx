
interface Maintenance {
    id: string;
    date: string;
    description: string;
    technician: string;
  }
  
interface MaintenanceHistoryProps {
    history: Maintenance[];
}

const MaintenanceHistory: React.FC<MaintenanceHistoryProps> = ({ history }) => {
return (
    <div className="p-4 bg-gray-50 rounded-md shadow-sm">
    <h2 className="text-2xl font-bold mb-4">Histórico de Manutenções</h2>
    {history.length > 0 ? (
        <ul className="space-y-4">
        {history.map((maintenance) => (
            <li key={maintenance.id} className="p-4 border rounded-md">
            <p><strong>Data:</strong> {maintenance.date}</p>
            <p><strong>Descrição:</strong> {maintenance.description}</p>
            <p><strong>Técnico:</strong> {maintenance.technician}</p>
            </li>
        ))}
        </ul>
    ) : (
        <p>Nenhuma manutenção registrada.</p>
    )}
    </div>
);
};

export default MaintenanceHistory;
