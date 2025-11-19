import VehicleCard from './VehicleCard';

/**
 * Componente CatalogSection - Catálogo de veículos
 * Exibe grid responsivo com cards de veículos
 * 2 colunas (desktop) -> 2 colunas (tablet) -> 1 coluna (mobile)
 */
const CatalogSection = () => {
  // Array de veículos do catálogo
  const vehicles = [
    {
      id: 1,
      badge: '2024',
      image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?q=80&w=1920&auto=format&fit=crop',
      brand: 'Performance Motors',
      model: 'Sportiva GT',
      power: '580',
      fuel: 'Gasolina',
      km: '5.000 km',
      price: 'R$ 450.000',
    },
    {
      id: 2,
      badge: '2024',
      image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?q=80&w=1920&auto=format&fit=crop',
      brand: 'City Motors',
      model: 'Urban SUV Pro',
      power: '240',
      fuel: 'Flex',
      km: '12.000 km',
      price: 'R$ 320.000',
    },
    {
      id: 3,
      badge: '2024',
      image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?q=80&w=1920&auto=format&fit=crop',
      brand: 'Green Auto',
      model: 'EcoSedan Elite',
      power: '300',
      fuel: 'Elétrico (450 km autonomia)',
      km: '8.000 km',
      price: 'R$ 280.000',
    },
    {
      id: 4,
      badge: '2024',
      image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1920&auto=format&fit=crop',
      brand: 'Urban Motors',
      model: 'City Compact',
      power: '120',
      fuel: 'Flex',
      km: '25.000 km',
      price: 'R$ 95.000',
    },
  ];

  return (
    <section id="catalog" className="bg-white py-12 sm:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Título da Seção */}
        <div className="text-center mb-10 sm:mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-secondary mb-4">
            Nosso Catálogo
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
            Explore nossa seleção de veículos premium, cuidadosamente escolhidos
            para oferecer o melhor em performance, conforto e tecnologia.
          </p>
        </div>

        {/* Grid de Veículos - Responsivo */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
          {vehicles.map((vehicle) => (
            <VehicleCard
              key={vehicle.id}
              id={vehicle.id}
              badge={vehicle.badge}
              image={vehicle.image}
              brand={vehicle.brand}
              model={vehicle.model}
              power={vehicle.power}
              fuel={vehicle.fuel}
              km={vehicle.km}
              price={vehicle.price}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CatalogSection;
