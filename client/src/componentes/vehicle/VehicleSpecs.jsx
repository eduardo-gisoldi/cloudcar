import { FiSettings, FiZap, FiDroplet, FiTrendingUp, FiTool, FiEye } from 'react-icons/fi';

/**
 * Componente VehicleSpecs - Grid de especificações técnicas do veículo
 * Props:
 * - specs: objeto com motor, power, fuel, km, transmission, color
 */
const VehicleSpecs = ({ specs }) => {
  // Array de especificações com ícones correspondentes
  const specsArray = [
    {
      id: 1,
      icon: FiSettings,
      label: 'Motor',
      value: specs.motor,
    },
    {
      id: 2,
      icon: FiZap,
      label: 'Potência',
      value: specs.power,
    },
    {
      id: 3,
      icon: FiDroplet,
      label: 'Combustível',
      value: specs.fuel,
    },
    {
      id: 4,
      icon: FiTrendingUp,
      label: 'Quilometragem',
      value: specs.km,
    },
    {
      id: 5,
      icon: FiTool,
      label: 'Câmbio',
      value: specs.transmission,
    },
    {
      id: 6,
      icon: FiEye,
      label: 'Cor',
      value: specs.color,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 mb-6">
      {specsArray.map((spec) => {
        const IconComponent = spec.icon;
        return (
          <div
            key={spec.id}
            className="bg-gray-50 p-4 rounded-lg border border-gray-200 hover:border-primary/50
                     hover:bg-gray-100 transition-all duration-300"
          >
            <div className="flex items-start gap-3">
              {/* Ícone */}
              <div className="bg-primary/10 p-2.5 rounded-lg">
                <IconComponent className="w-5 h-5 text-primary" />
              </div>

              {/* Label e Valor */}
              <div className="flex-1">
                <p className="text-xs text-gray-500 font-medium mb-1">
                  {spec.label}
                </p>
                <p className="text-sm sm:text-base font-semibold text-secondary">
                  {spec.value}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default VehicleSpecs;
