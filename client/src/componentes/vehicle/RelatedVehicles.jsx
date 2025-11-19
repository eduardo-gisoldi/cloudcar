import VehicleCard from '../layout/VehicleCard';

/**
 * Componente RelatedVehicles - Seção "Você também pode gostar"
 * Exibe veículos relacionados/sugeridos
 * Props:
 * - vehicles: array de veículos relacionados
 */
const RelatedVehicles = ({ vehicles }) => {
  return (
    <section className="bg-white py-12 sm:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Título da Seção */}
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-secondary mb-8 sm:mb-10 text-center">
          Você Também Pode Gostar
        </h2>

        {/* Grid de Veículos Relacionados - Responsivo */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {vehicles.map((vehicle) => (
            <VehicleCard
              key={vehicle.id}
              id={vehicle.id}
              badge={vehicle.badge}
              image={vehicle.image}
              brand={vehicle.category}
              model={vehicle.name}
              power={vehicle.specs.power.replace(' CV', '')}
              fuel={vehicle.specs.fuel}
              km={vehicle.specs.km}
              price={vehicle.price}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RelatedVehicles;
