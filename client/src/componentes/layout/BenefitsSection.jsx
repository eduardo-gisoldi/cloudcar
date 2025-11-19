import { FiShield, FiAward, FiSearch, FiPhone } from 'react-icons/fi';

/**
 * Componente BenefitsSection - Seção de benefícios
 * Grid responsivo com 4 cards de benefícios
 * 4 colunas (desktop) -> 2 colunas (tablet) -> 1 coluna (mobile)
 */
const BenefitsSection = () => {
  // Array de benefícios com ícones e descrições
  const benefits = [
    {
      id: 1,
      icon: FiShield,
      title: 'Garantia Total',
      description: 'Todos os veículos com garantia estendida',
      color: 'text-primary',
    },
    {
      id: 2,
      icon: FiAward,
      title: 'Qualidade Certificada',
      description: 'Veículos inspecionados e certificados',
      color: 'text-primary',
    },
    {
      id: 3,
      icon: FiSearch,
      title: 'Transparência',
      description: 'Histórico completo de cada veículo',
      color: 'text-primary',
    },
    {
      id: 4,
      icon: FiPhone,
      title: 'Suporte 24/7',
      description: 'Atendimento sempre que precisar',
      color: 'text-primary',
    },
  ];

  return (
    <section className="bg-gray-50 py-12 sm:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Grid de Benefícios - Responsivo */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {benefits.map((benefit) => {
            const IconComponent = benefit.icon;
            return (
              <div
                key={benefit.id}
                className="bg-white p-6 sm:p-8 rounded-xl shadow-lg hover:shadow-2xl
                         transform hover:-translate-y-2 transition-all duration-300
                         border border-gray-100 hover:border-primary/50"
              >
                {/* Ícone */}
                <div className="flex justify-center mb-4 sm:mb-6">
                  <div
                    className="bg-primary/10 p-4 sm:p-5 rounded-full
                             group-hover:bg-primary/20 transition-colors duration-300"
                  >
                    <IconComponent
                      className={`w-8 h-8 sm:w-10 sm:h-10 ${benefit.color}`}
                    />
                  </div>
                </div>

                {/* Título */}
                <h3 className="text-lg sm:text-xl font-bold text-secondary mb-2 sm:mb-3 text-center">
                  {benefit.title}
                </h3>

                {/* Descrição */}
                <p className="text-sm sm:text-base text-gray-600 text-center leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
