import { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import { useNavigate, useLocation } from 'react-router-dom';

/**
 * Componente Header - Menu de navegação responsivo
 * Mobile: Menu hamburger que abre/fecha
 * Desktop: Menu horizontal fixo
 */
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Função para fechar o menu ao clicar em um link
  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  // Função para scroll suave até a seção
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      handleLinkClick();
    }
  };

  // Função para navegar para home e depois fazer scroll
  const navigateToHome = (sectionId) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      scrollToSection(sectionId);
    }
    handleLinkClick();
  };

  // Função para navegar para admin
  const navigateToAdmin = () => {
    navigate('/admin');
    handleLinkClick();
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-secondary/95 backdrop-blur-sm shadow-lg z-50">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <div className="flex-shrink-0 cursor-pointer" onClick={() => navigate('/')}>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Cloud<span className="text-primary">Car</span>
            </h1>
          </div>

          {/* Menu Desktop */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => navigateToHome('hero')}
              className="text-white hover:text-primary transition-colors duration-300 font-medium text-lg"
            >
              Início
            </button>
            <button
              onClick={() => navigateToHome('catalog')}
              className="text-white hover:text-primary transition-colors duration-300 font-medium text-lg"
            >
              Catálogo
            </button>
            <button
              onClick={() => navigateToHome('about')}
              className="text-white hover:text-primary transition-colors duration-300 font-medium text-lg"
            >
              Sobre Nós
            </button>
            <button
              onClick={navigateToAdmin}
              className="text-white hover:text-primary transition-colors duration-300 font-medium text-lg"
            >
              Admin
            </button>
          </div>

          {/* Botão Hamburger Mobile */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-primary transition-colors duration-300 p-2"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <FiX className="w-7 h-7" />
              ) : (
                <FiMenu className="w-7 h-7" />
              )}
            </button>
          </div>
        </div>

        {/* Menu Mobile - Dropdown */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="py-4 space-y-3 border-t border-gray-700">
            <button
              onClick={() => navigateToHome('hero')}
              className="block w-full text-left px-4 py-3 text-white hover:bg-primary/10 hover:text-primary transition-all duration-300 font-medium rounded-lg"
            >
              Início
            </button>
            <button
              onClick={() => navigateToHome('catalog')}
              className="block w-full text-left px-4 py-3 text-white hover:bg-primary/10 hover:text-primary transition-all duration-300 font-medium rounded-lg"
            >
              Catálogo
            </button>
            <button
              onClick={() => navigateToHome('about')}
              className="block w-full text-left px-4 py-3 text-white hover:bg-primary/10 hover:text-primary transition-all duration-300 font-medium rounded-lg"
            >
              Sobre Nós
            </button>
            <button
              onClick={navigateToAdmin}
              className="block w-full text-left px-4 py-3 text-white hover:bg-primary/10 hover:text-primary transition-all duration-300 font-medium rounded-lg"
            >
              Admin
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;