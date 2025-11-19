/**
 * Dados detalhados de todos os veículos do catálogo CloudCar
 * Cada veículo contém informações completas para a página de detalhes
 */

export const vehiclesData = [
  {
    id: 1,
    category: 'Performance Motors',
    name: 'Sportiva GT',
    badge: '2024',
    price: 'R$ 450.000',
    priceValue: 450000,
    image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?q=80&w=1920&auto=format&fit=crop',
    description: 'Um carro esportivo de luxo com design aerodinâmico e performance excepcional. Perfeito para quem busca emoção e sofisticação em cada curva.',
    specs: {
      motor: 'V8 Biturbo',
      power: '580 CV',
      fuel: 'Gasolina',
      km: '5.000 km',
      transmission: 'Automático 8 marchas',
      color: 'Vermelho Metálico',
    },
    features: [
      'Sistema de som premium',
      'Piloto automático adaptativo',
      'Rodas de liga leve 20"',
      'Bancos em couro',
      'Sistema de navegação GPS',
      'Controle de tração esportivo',
      'Teto solar panorâmico',
      'Câmera 360°',
    ],
  },
  {
    id: 2,
    category: 'City Motors',
    name: 'Urban SUV Pro',
    badge: '2024',
    price: 'R$ 320.000',
    priceValue: 320000,
    image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?q=80&w=1920&auto=format&fit=crop',
    description: 'SUV de luxo perfeito para a família moderna. Combina espaço, conforto e tecnologia de ponta em um design elegante e imponente.',
    specs: {
      motor: 'V6 3.6L',
      power: '240 CV',
      fuel: 'Flex',
      km: '12.000 km',
      transmission: 'Automático 6 marchas',
      color: 'Preto Pérola',
    },
    features: [
      'Sistema multimídia touchscreen',
      'Controle de estabilidade',
      'Rodas de liga leve 18"',
      'Bancos em couro sintético',
      'Sensor de estacionamento',
      'Controle de cruzeiro',
      'Ar-condicionado digital',
      'Entrada USB múltipla',
    ],
  },
  {
    id: 3,
    category: 'Green Auto',
    name: 'EcoSedan Elite',
    badge: '2024',
    price: 'R$ 280.000',
    priceValue: 280000,
    image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?q=80&w=1920&auto=format&fit=crop',
    description: 'Sedan elétrico que une sustentabilidade e luxo. Com autonomia de 450 km, é a escolha perfeita para quem busca economia e consciência ambiental.',
    specs: {
      motor: 'Elétrico',
      power: '300 CV',
      fuel: 'Elétrico (450 km autonomia)',
      km: '8.000 km',
      transmission: 'Automático CVT',
      color: 'Branco Perolizado',
    },
    features: [
      'Carregamento rápido',
      'Piloto automático nível 2',
      'Rodas aerodinâmicas 19"',
      'Interior em couro vegano',
      'Painel digital 15"',
      'Modo eco e sport',
      'Teto solar elétrico',
      'Sistema de som 12 alto-falantes',
    ],
  },
  {
    id: 4,
    category: 'Urban Motors',
    name: 'City Compact',
    badge: '2024',
    price: 'R$ 95.000',
    priceValue: 95000,
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1920&auto=format&fit=crop',
    description: 'Compacto moderno e econômico, ideal para o dia a dia urbano. Design jovem, tecnologia embarcada e baixo custo de manutenção.',
    specs: {
      motor: '1.0 Turbo',
      power: '120 CV',
      fuel: 'Flex',
      km: '25.000 km',
      transmission: 'Manual 6 marchas',
      color: 'Azul Cosmic',
    },
    features: [
      'Central multimídia 7"',
      'Direção elétrica',
      'Rodas de liga leve 15"',
      'Ar-condicionado',
      'Bluetooth e USB',
      'Controle de estabilidade',
      'Vidros elétricos',
      'Alarme e trava elétrica',
    ],
  },
];

/**
 * Função para buscar um veículo por ID
 * @param {number} id - ID do veículo
 * @returns {object|null} - Dados do veículo ou null se não encontrado
 */
export const getVehicleById = (id) => {
  return vehiclesData.find((vehicle) => vehicle.id === parseInt(id)) || null;
};

/**
 * Função para buscar veículos relacionados (exceto o atual)
 * @param {number} currentId - ID do veículo atual
 * @param {number} limit - Quantidade de veículos a retornar
 * @returns {array} - Array com veículos relacionados
 */
export const getRelatedVehicles = (currentId, limit = 3) => {
  return vehiclesData
    .filter((vehicle) => vehicle.id !== parseInt(currentId))
    .slice(0, limit);
};
