import { useNavigate } from 'react-router-dom';
import { FiZap, FiDroplet, FiTrendingUp } from 'react-icons/fi';

/**
 * Componente VehicleCard - Card de veículo individual
 * Props:
 * - id: ID do veículo para navegação
 * - badge: Ano do veículo (ex: "2024")
 * - image: URL da imagem
 * - brand: Marca do veículo
 * - model: Modelo do veículo
 * - power: Potência (CV)
 * - fuel: Tipo de combustível
 * - km: Quilometragem
 * - price: Preço formatado
 */
const VehicleCard = ({ id, badge, image, brand, model, power, fuel, km, price }) => {
  const navigate = useNavigate();

  // Handler para navegar para página de detalhes
  const handleViewDetails = () => {
    navigate(`/vehicle/${id}`);
  };
  return (
    <div
      className="bg-white rounded-xl shadow-lg overflow-hidden
                 transform hover:scale-105 hover:shadow-2xl transition-all duration-300
                 border border-gray-100 hover:border-primary/50 group"
    >
      {/* Imagem do Veículo */}
      <div className="relative overflow-hidden h-48 sm:h-56 md:h-64">
        <img
          src={image}
          alt={`${brand} ${model}`}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />

        {/* Badge do Ano */}
        <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full font-bold text-sm shadow-lg">
          {badge}
        </div>
      </div>

      {/* Conteúdo do Card */}
      <div className="p-5 sm:p-6">
        {/* Marca e Modelo */}
        <div className="mb-4">
          <p className="text-sm text-gray-500 font-medium mb-1">{brand}</p>
          <h3 className="text-xl sm:text-2xl font-bold text-secondary">
            {model}
          </h3>
        </div>

        {/* Especificações */}
        <div className="flex flex-wrap items-center gap-4 mb-5 text-sm text-gray-600">
          {/* Potência */}
          <div className="flex items-center gap-1.5">
            <FiZap className="w-4 h-4 text-primary" />
            <span>{power} CV</span>
          </div>

          {/* Combustível */}
          <div className="flex items-center gap-1.5">
            <FiDroplet className="w-4 h-4 text-primary" />
            <span>{fuel}</span>
          </div>

          {/* Quilometragem */}
          <div className="flex items-center gap-1.5">
            <FiTrendingUp className="w-4 h-4 text-primary" />
            <span>{km}</span>
          </div>
        </div>

        {/* Preço */}
        <div className="mb-5">
          <p className="text-sm text-gray-500 mb-1">A partir de</p>
          <p className="text-2xl sm:text-3xl font-bold text-primary">{price}</p>
        </div>

        {/* Botão Ver Detalhes */}
        <button
          onClick={handleViewDetails}
          className="w-full bg-primary text-white py-3 sm:py-4 rounded-lg font-semibold
                   hover:bg-secondary transition-colors duration-300
                   transform hover:scale-105 active:scale-95 shadow-md hover:shadow-lg
                   text-sm sm:text-base"
        >
          Ver Detalhes
        </button>
      </div>
    </div>
  );
};

export default VehicleCard;
