interface DetailsCardProps {
    name: string;
    type: string;
    location: string;
    model: string;
    serialNumber: string;
    manufactureDate: string;
  }
  
  const DetailsCard: React.FC<DetailsCardProps> = ({
    name,
    type,
    location,
    model,
    serialNumber,
    manufactureDate,
  }) => {
    return (
      <div className="p-4 bg-gray-50 rounded-md shadow-sm">
        <h2 className="text-2xl font-bold mb-4">{name}</h2>
        <ul>
          <li><strong>Tipo:</strong> {type}</li>
          <li><strong>Localização:</strong> {location}</li>
          <li><strong>Modelo:</strong> {model}</li>
          <li><strong>Número de Série:</strong> {serialNumber}</li>
          <li><strong>Data de Fabricação:</strong> {manufactureDate}</li>
        </ul>
      </div>
    );
  };
  
  export default DetailsCard;
  