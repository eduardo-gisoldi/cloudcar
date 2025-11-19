import { FiCheck } from 'react-icons/fi';

/**
 * Componente Features - Lista de características e equipamentos do veículo
 * Props:
 * - features: array de strings com as características
 */
const Features = ({ features }) => {
  return (
    <section className="bg-gray-50 py-12 sm:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Título da Seção */}
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-secondary mb-8 sm:mb-10 text-center">
          Características e Equipamentos
        </h2>

        {/* Grid de Features - Responsivo */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-start gap-3 bg-white p-4 rounded-lg
                       shadow-sm hover:shadow-md transition-shadow duration-300
                       border border-gray-100"
            >
              {/* Ícone de Check Verde */}
              <div className="flex-shrink-0 mt-0.5">
                <div className="bg-green-100 p-1 rounded-full">
                  <FiCheck className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 font-bold" />
                </div>
              </div>

              {/* Texto da Feature */}
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                {feature}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
