import { useParams } from 'react-router-dom';
import FinanciamentoForm from '../forms/FinanciamentoForm';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import { getVehicleById } from '../../data/vehiclesDetailed';

/**
 * Página de Financiamento
 * Renderiza o formulário de simulação de financiamento
 */
const Financiamento = () => {
  const { vehicleId } = useParams();
  let vehicleName = '';
  let vehiclePrice = 0;

  // Se houver um vehicleId, buscar os dados do veículo
  if (vehicleId) {
    const vehicle = getVehicleById(vehicleId);
    if (vehicle) {
      vehicleName = `${vehicle.category} ${vehicle.name}`;
      // Remover formatação do preço para usar no cálculo
      vehiclePrice = parseFloat(vehicle.price.replace('R$', '').replace(/\./g, '').replace(',', '.').trim());
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="h-16 sm:h-20"></div>
      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <FinanciamentoForm
          vehicleId={vehicleId}
          vehicleName={vehicleName}
          vehiclePrice={vehiclePrice}
        />
      </div>
      <Footer />
    </div>
  );
};

export default Financiamento;
