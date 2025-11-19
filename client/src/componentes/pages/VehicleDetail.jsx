import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import VehicleSpecs from '../vehicle/VehicleSpecs';
import ActionButtons from '../vehicle/ActionButtons';
import Features from '../vehicle/Features';
import RelatedVehicles from '../vehicle/RelatedVehicles';
import { getVehicleById, getRelatedVehicles } from '../../data/vehiclesDetailed';

/**
 * Componente VehicleDetail - Página completa de detalhes do veículo
 * Rota: /vehicle/:id
 */
const VehicleDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Buscar dados do veículo
  const vehicle = getVehicleById(id);

  // Buscar veículos relacionados
  const relatedVehicles = getRelatedVehicles(id, 3);

  // Scroll to top ao entrar na página
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // Se o veículo não for encontrado, redirecionar para home
  if (!vehicle) {
    navigate('/');
    return null;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header />

      {/* Espaçamento para o header fixo */}
      <div className="h-16 sm:h-20"></div>

      {/* Botão Voltar ao Catálogo */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-primary hover:text-blue-700 font-medium
                     transition-colors duration-300 text-sm sm:text-base"
          >
            <FiArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            Voltar ao Catálogo
          </button>
        </div>
      </div>

      {/* Seção Principal do Veículo */}
      <section className="py-8 sm:py-12 lg:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* LADO ESQUERDO - Imagem do Veículo */}
            <div className="relative">
              <div className="relative overflow-hidden rounded-xl shadow-2xl aspect-video">
                <img
                  src={vehicle.image}
                  alt={`${vehicle.category} ${vehicle.name}`}
                  className="w-full h-full object-cover"
                />

                {/* Badge do Ano */}
                <div className="absolute top-4 right-4 bg-primary text-white px-4 py-2 rounded-full font-bold text-sm sm:text-base shadow-lg">
                  {vehicle.badge}
                </div>
              </div>
            </div>

            {/* LADO DIREITO - Informações */}
            <div className="flex flex-col">
              {/* Categoria */}
              <p className="text-sm sm:text-base text-gray-500 font-medium mb-2">
                {vehicle.category}
              </p>

              {/* Nome do Veículo */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-secondary mb-4">
                {vehicle.name}
              </h1>

              {/* Preço */}
              <p className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-6">
                {vehicle.price}
              </p>

              {/* Descrição */}
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-8">
                {vehicle.description}
              </p>

              {/* Especificações Técnicas */}
              <div className="mb-8">
                <h3 className="text-xl sm:text-2xl font-bold text-secondary mb-4">
                  Especificações Técnicas
                </h3>
                <VehicleSpecs specs={vehicle.specs} />
              </div>

              {/* Botões de Ação */}
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-secondary mb-4">
                  Entre em Contato
                </h3>
                <ActionButtons
                  vehicleId={vehicle.id}
                  vehicleName={vehicle.name}
                  vehiclePrice={vehicle.price}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Características e Equipamentos */}
      <Features features={vehicle.features} />

      {/* Veículos Relacionados */}
      <RelatedVehicles vehicles={relatedVehicles} />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default VehicleDetail;
