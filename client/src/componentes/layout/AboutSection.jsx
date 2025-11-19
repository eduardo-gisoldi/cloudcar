import { FiAward, FiBook, FiCode, FiCloud } from 'react-icons/fi';

/**
 * Componente AboutSection - Seção Sobre Nós
 * Informações sobre o projeto acadêmico
 */
const AboutSection = () => {
  return (
    <section
      id="about"
      className="bg-gradient-to-br from-gray-50 via-white to-gray-100 py-12 sm:py-16 lg:py-20"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Título da Seção */}
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-secondary mb-4">
              Sobre o <span className="text-primary">CloudCar</span>
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Um projeto acadêmico inovador que une tecnologia em nuvem e desenvolvimento web
            </p>
          </div>

          {/* Conteúdo Principal */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
            {/* Lado Esquerdo - Texto */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 border-l-4 border-primary">
                <h3 className="text-2xl sm:text-3xl font-bold text-secondary mb-4">
                  Projeto Acadêmico
                </h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  O <strong>CloudCar</strong> é um projeto desenvolvido como parte da disciplina de{' '}
                  <strong>Desenvolvimento em Nuvem</strong> do curso de{' '}
                  <strong>Ciência da Computação</strong> da{' '}
                  <strong>Universidade Municipal de São Caetano do Sul (USCS)</strong>.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Este projeto tem como objetivo aplicar conceitos modernos de desenvolvimento web,
                  arquitetura em nuvem, e boas práticas de engenharia de software em um cenário
                  real de e-commerce automotivo.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Através desta aplicação, exploramos tecnologias como React, Node.js, Express,
                  MySQL, e infraestrutura cloud, criando uma plataforma completa para consulta e
                  simulação de compra de veículos.
                </p>
              </div>
            </div>

            {/* Lado Direito - Cards de Destaque */}
            <div className="space-y-4">
              {/* Card 1 */}
              <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow duration-300 border-t-4 border-primary">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <FiBook className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-secondary mb-2">
                      Instituição
                    </h4>
                    <p className="text-gray-600">
                      Universidade Municipal de São Caetano do Sul - USCS
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 2 */}
              <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow duration-300 border-t-4 border-blue-500">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-500/10 p-3 rounded-lg">
                    <FiAward className="w-6 h-6 text-blue-500" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-secondary mb-2">
                      Curso
                    </h4>
                    <p className="text-gray-600">
                      Bacharelado em Ciência da Computação
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 3 */}
              <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow duration-300 border-t-4 border-green-500">
                <div className="flex items-start gap-4">
                  <div className="bg-green-500/10 p-3 rounded-lg">
                    <FiCloud className="w-6 h-6 text-green-500" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-secondary mb-2">
                      Disciplina
                    </h4>
                    <p className="text-gray-600">
                      Desenvolvimento em Nuvem
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 4 */}
              <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow duration-300 border-t-4 border-purple-500">
                <div className="flex items-start gap-4">
                  <div className="bg-purple-500/10 p-3 rounded-lg">
                    <FiCode className="w-6 h-6 text-purple-500" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-secondary mb-2">
                      Tecnologias
                    </h4>
                    <p className="text-gray-600">
                      React, Node.js, Express, MySQL, Cloud Computing
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Objetivos do Projeto */}
          <div className="bg-gradient-to-r from-primary to-blue-600 rounded-xl shadow-2xl p-8 sm:p-10 text-white">
            <h3 className="text-2xl sm:text-3xl font-bold mb-6 text-center">
              Objetivos do Projeto
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <div className="bg-white/20 rounded-full p-2 mt-1">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <p className="leading-relaxed">
                  Aplicar conceitos de arquitetura em nuvem em ambiente prático
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-white/20 rounded-full p-2 mt-1">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <p className="leading-relaxed">
                  Desenvolver uma aplicação web completa e responsiva
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-white/20 rounded-full p-2 mt-1">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <p className="leading-relaxed">
                  Implementar integração entre frontend e backend
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-white/20 rounded-full p-2 mt-1">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <p className="leading-relaxed">
                  Simular operações reais de um e-commerce automotivo
                </p>
              </div>
            </div>
          </div>

          {/* Nota Acadêmica */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500 italic">
              Este projeto foi desenvolvido exclusivamente para fins educacionais e acadêmicos
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
