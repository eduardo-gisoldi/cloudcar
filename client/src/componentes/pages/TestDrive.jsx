import { useParams } from 'react-router-dom';
import TestDriveForm from '../forms/TestDriveForm';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import { getVehicleById } from '../../data/vehiclesDetailed';

/**
 * Página de Test Drive
 * Renderiza o formulário de agendamento de test drive
 */
const TestDrive = () => {
  const { vehicleId } = useParams();
  let vehicleName = '';

  // Se houver um vehicleId, buscar os dados do veículo
  if (vehicleId) {
    const vehicle = getVehicleById(vehicleId);
    if (vehicle) {
      vehicleName = `${vehicle.category} ${vehicle.name}`;
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="h-16 sm:h-20"></div>
      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <TestDriveForm vehicleId={vehicleId} vehicleName={vehicleName} />
      </div>
      <Footer />
    </div>
  );
};

export default TestDrive;
