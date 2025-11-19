import { FiPhone, FiMail } from 'react-icons/fi';

/**
 * Componente CTASection - Seção Call to Action
 * Fundo escuro com botões de contato
 * Responsivo: botões em coluna (mobile) e em linha (desktop)
 */
const CTASection = () => {
  return (
    <section
      id="contact"
      className="bg-gradient-to-r from-secondary via-gray-900 to-black py-12 sm:py-16 lg:py-20"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Título */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
            Pronto para Dirigir seu{' '}
            <span className="text-primary">Novo Carro?</span>
          </h2>

          {/* Texto */}
          <p className="text-base sm:text-lg lg:text-xl text-gray-300 mb-8 sm:mb-10 lg:mb-12 leading-relaxed px-4">
            Entre em contato conosco e agende um test drive. Nossa equipe está
            pronta para ajudá-lo a encontrar o veículo perfeito para você.
          </p>

          {/* Botões de Contato */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 px-4">
            {/* Botão Telefone */}
            <a
              href="tel:+5511944007513"
              className="w-full sm:w-auto bg-primary text-white px-8 py-4 rounded-lg font-semibold text-base sm:text-lg
                       hover:bg-blue-600 transform hover:scale-105 transition-all duration-300
                       shadow-lg hover:shadow-2xl min-h-[56px] flex items-center justify-center gap-2"
            >
              <FiPhone className="w-5 h-5" />
              (11) 94400-7513
            </a>

            {/* Botão Email */}
            <a
              href="mailto:contato@cloudcar.com.br"
              className="w-full sm:w-auto bg-transparent border-2 border-primary text-primary px-8 py-4 rounded-lg
                       font-semibold text-base sm:text-lg hover:bg-primary hover:text-white transform hover:scale-105
                       transition-all duration-300 shadow-lg hover:shadow-2xl min-h-[56px] flex items-center justify-center gap-2"
            >
              <FiMail className="w-5 h-5" />
              contato@cloudcar.com.br
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
