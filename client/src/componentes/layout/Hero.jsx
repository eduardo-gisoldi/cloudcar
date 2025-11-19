/**
 * Componente Hero - Seção principal do site
 * Background com imagem de carro esportivo
 * Título, subtítulo e botões call-to-action
 * Totalmente responsivo
 */
const Hero = () => {
  // Função para scroll suave até o catálogo
  const scrollToCatalog = () => {
    const element = document.getElementById('catalog');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Função para scroll até seção de contato
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-16 sm:pt-20"
      style={{
        backgroundImage:
          'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1920&auto=format&fit=crop)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Título Principal */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight animate-fade-in">
            Encontre o Carro dos{' '}
            <span className="text-primary">Seus Sonhos</span>
          </h1>

          {/* Subtítulo */}
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-200 mb-8 sm:mb-10 lg:mb-12 max-w-3xl mx-auto leading-relaxed px-4">
            A CloudCar oferece os melhores veículos com qualidade garantida e
            atendimento excepcional. Sua próxima aventura começa aqui.
          </p>

          {/* Botões Call-to-Action */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 px-4">
            {/* Botão Ver Catálogo */}
            <button
              onClick={scrollToCatalog}
              className="w-full sm:w-auto bg-white text-secondary px-8 py-4 rounded-lg font-semibold text-base sm:text-lg
                       hover:bg-primary hover:text-white transform hover:scale-105 transition-all duration-300
                       shadow-lg hover:shadow-2xl min-h-[56px] flex items-center justify-center"
            >
              Ver Catálogo
            </button>

            {/* Botão Fale Conosco */}
            <button
              onClick={scrollToContact}
              className="w-full sm:w-auto bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg
                       font-semibold text-base sm:text-lg hover:bg-white hover:text-secondary transform hover:scale-105
                       transition-all duration-300 shadow-lg hover:shadow-2xl min-h-[56px] flex items-center justify-center"
            >
              Fale Conosco
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator (opcional - aparece apenas em desktop) */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden lg:block animate-bounce">
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;
