import { useNavigate } from 'react-router-dom';
import { FiTruck, FiDollarSign, FiPhone, FiMessageCircle } from 'react-icons/fi';

/**
 * Componente ActionButtons - Botões de ação para contato e interação
 * Props:
 * - vehicleId: ID do veículo
 * - vehicleName: nome do veículo
 * - vehiclePrice: preço formatado do veículo
 */
const ActionButtons = ({ vehicleId, vehicleName, vehiclePrice }) => {
  const navigate = useNavigate();

  // Números de contato fixos
  const WHATSAPP_NUMBER = '5511944007513';
  const PHONE_NUMBER = '+5511944007513';

  // Handler para navegar ao formulário de test drive
  const handleTestDrive = () => {
    navigate(`/test-drive/${vehicleId}`);
  };

  // Handler para navegar ao formulário de financiamento
  const handleFinancing = () => {
    navigate(`/financiamento/${vehicleId}`);
  };

  // Handler para ligação direta
  const handleCall = () => {
    window.open(`tel:${PHONE_NUMBER}`, '_self');
  };

  // Handler para abrir WhatsApp com mensagem genérica
  const handleWhatsAppMessage = () => {
    const message = `Olá! Gostaria de mais informações sobre o *${vehicleName}* no valor de ${vehiclePrice}.`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="space-y-3 sm:space-y-4">
      {/* Botão 1: Agendar Test Drive (Primário) */}
      <button
        onClick={handleTestDrive}
        className="w-full bg-primary text-white py-4 px-6 rounded-lg font-semibold text-base
                 hover:bg-blue-700 transition-all duration-300 transform hover:scale-105
                 shadow-lg hover:shadow-xl flex items-center justify-center gap-3 min-h-[56px]"
      >
        <FiTruck className="w-5 h-5" />
        Agendar Test Drive
      </button>

      {/* Botão 2: Simular Financiamento (Secundário) */}
      <button
        onClick={handleFinancing}
        className="w-full bg-white text-secondary border-2 border-gray-300 py-4 px-6 rounded-lg
                 font-semibold text-base hover:bg-gray-50 hover:border-primary transition-all duration-300
                 transform hover:scale-105 shadow-md hover:shadow-lg flex items-center justify-center gap-3 min-h-[56px]"
      >
        <FiDollarSign className="w-5 h-5" />
        Simular Financiamento
      </button>

      {/* Botão 3: Ligar Agora (Secundário) */}
      <button
        onClick={handleCall}
        className="w-full bg-white text-secondary border-2 border-gray-300 py-4 px-6 rounded-lg
                 font-semibold text-base hover:bg-gray-50 hover:border-primary transition-all duration-300
                 transform hover:scale-105 shadow-md hover:shadow-lg flex items-center justify-center gap-3 min-h-[56px]"
      >
        <FiPhone className="w-5 h-5" />
        Ligar Agora
      </button>

      {/* Botão 4: Enviar Mensagem (Secundário) */}
      <button
        onClick={handleWhatsAppMessage}
        className="w-full bg-white text-secondary border-2 border-gray-300 py-4 px-6 rounded-lg
                 font-semibold text-base hover:bg-gray-50 hover:border-primary transition-all duration-300
                 transform hover:scale-105 shadow-md hover:shadow-lg flex items-center justify-center gap-3 min-h-[56px]"
      >
        <FiMessageCircle className="w-5 h-5" />
        Enviar Mensagem
      </button>
    </div>
  );
};

export default ActionButtons;
