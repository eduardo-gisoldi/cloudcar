import Header from '../layout/Header';
import Hero from '../layout/Hero';
import BenefitsSection from '../layout/BenefitsSection';
import CatalogSection from '../layout/CatalogSection';
import AboutSection from '../layout/AboutSection';
import CTASection from '../layout/CTASection';
import Footer from '../layout/Footer';

/**
 * Componente Home - Página inicial do site CloudCar
 * Rota: /
 */
const Home = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header fixo no topo */}
      <Header />

      {/* Seção Hero com background de carro */}
      <Hero />

      {/* Seção de Benefícios */}
      <BenefitsSection />

      {/* Seção de Catálogo de Veículos */}
      <CatalogSection />

      {/* Seção Sobre Nós */}
      <AboutSection />

      {/* Seção Call to Action */}
      <CTASection />

      {/* Rodapé */}
      <Footer />
    </div>
  );
};

export default Home;
