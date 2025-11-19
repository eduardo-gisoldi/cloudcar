/**
 * Componente Footer - Rodapé do site
 * Copyright e informações da empresa
 * Centralizado e responsivo
 */
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="about" className="bg-secondary py-8 sm:py-10 lg:py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Logo */}
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Cloud<span className="text-primary">Car</span>
          </h2>

          {/* Texto sobre a empresa */}
          <p className="text-sm sm:text-base text-gray-400 mb-4 max-w-2xl mx-auto">
            Concessionária de veículos com qualidade e confiança
          </p>

          {/* Divider */}
          <div className="w-24 h-1 bg-primary mx-auto mb-4"></div>

          {/* Copyright */}
          <p className="text-xs sm:text-sm text-gray-500">
            © {currentYear} CloudCar - Todos os direitos reservados
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
