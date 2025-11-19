import { useState } from 'react';
import { FiCalendar, FiUser, FiMail, FiPhone, FiMapPin, FiClock, FiCheck } from 'react-icons/fi';

/**
 * Componente TestDriveForm - Formulário para agendar test drive
 * Coleta informações do cliente e preferências de agendamento
 * Pronto para integração com backend Node.js + Express + MySQL
 */
const TestDriveForm = ({ vehicleId, vehicleName }) => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    cpf: '',
    cidade: '',
    estado: '',
    dataPreferencial: '',
    horarioPreferencial: '',
    veiculoId: vehicleId || '',
    mensagem: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Validação de CPF
  const validarCPF = (cpf) => {
    cpf = cpf.replace(/[^\d]/g, '');
    if (cpf.length !== 11) return false;

    // Verifica se todos os dígitos são iguais
    if (/^(\d)\1{10}$/.test(cpf)) return false;

    let soma = 0;
    let resto;

    for (let i = 1; i <= 9; i++) {
      soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }

    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.substring(9, 10))) return false;

    soma = 0;
    for (let i = 1; i <= 10; i++) {
      soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }

    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.substring(10, 11))) return false;

    return true;
  };

  // Validação do formulário
  const validateForm = () => {
    const newErrors = {};

    if (!formData.nome.trim()) {
      newErrors.nome = 'Nome completo é obrigatório';
    } else if (formData.nome.trim().split(' ').length < 2) {
      newErrors.nome = 'Digite seu nome completo';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    const telefoneNumeros = formData.telefone.replace(/\D/g, '');
    if (!formData.telefone.trim()) {
      newErrors.telefone = 'Telefone é obrigatório';
    } else if (telefoneNumeros.length < 10 || telefoneNumeros.length > 11) {
      newErrors.telefone = 'Telefone inválido';
    }

    if (!formData.cpf.trim()) {
      newErrors.cpf = 'CPF é obrigatório';
    } else if (!validarCPF(formData.cpf)) {
      newErrors.cpf = 'CPF inválido';
    }

    if (!formData.cidade.trim()) {
      newErrors.cidade = 'Cidade é obrigatória';
    }

    if (!formData.estado) {
      newErrors.estado = 'Estado é obrigatório';
    }

    if (!formData.dataPreferencial) {
      newErrors.dataPreferencial = 'Data é obrigatória';
    } else {
      const dataSelecionada = new Date(formData.dataPreferencial);
      const hoje = new Date();
      hoje.setHours(0, 0, 0, 0);
      if (dataSelecionada < hoje) {
        newErrors.dataPreferencial = 'Data não pode ser no passado';
      }
    }

    if (!formData.horarioPreferencial) {
      newErrors.horarioPreferencial = 'Horário é obrigatório';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Máscaras para inputs
  const aplicarMascaraTelefone = (valor) => {
    const numeros = valor.replace(/\D/g, '');
    if (numeros.length <= 10) {
      return numeros.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    }
    return numeros.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  };

  const aplicarMascaraCPF = (valor) => {
    const numeros = valor.replace(/\D/g, '');
    return numeros.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  };

  // Handler de mudança de input
  const handleChange = (e) => {
    const { name, value } = e.target;
    let valorFormatado = value;

    if (name === 'telefone') {
      valorFormatado = aplicarMascaraTelefone(value);
    } else if (name === 'cpf') {
      valorFormatado = aplicarMascaraCPF(value);
    }

    setFormData(prev => ({
      ...prev,
      [name]: valorFormatado
    }));

    // Limpa erro do campo quando usuário começa a digitar
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

// Submit do formulário
const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validateForm()) {
    return;
  }

  setIsSubmitting(true);

  try {
    // Importar a função do serviço no topo do arquivo
    const { createTestDrive, createCliente } = await import('../../services/api');

    // 1. Primeiro, criar ou buscar o cliente
    const clienteData = {
      nome: formData.nome,
      email: formData.email,
      telefone: formData.telefone.replace(/\D/g, ''), // Remove formatação
      cpf: formData.cpf.replace(/\D/g, ''), // Remove formatação
      cidade: formData.cidade,
      estado: formData.estado,
      renda: null // Test drive não tem renda
    };

    const cliente = await createCliente(clienteData);

    // 2. Depois, criar o test drive vinculado ao cliente
    const testDriveData = {
      clienteId: cliente.id,
      data: formData.dataPreferencial,
      horario: formData.horarioPreferencial,
      mensagem: formData.mensagem
    };

    await createTestDrive(testDriveData);

    console.log('Test drive agendado com sucesso!');
    setSubmitSuccess(true);

    // Limpa o formulário
    setFormData({
      nome: '',
      email: '',
      telefone: '',
      cpf: '',
      cidade: '',
      estado: '',
      dataPreferencial: '',
      horarioPreferencial: '',
      veiculoId: vehicleId || '',
      mensagem: ''
    });

    // Oculta mensagem de sucesso após 5 segundos
    setTimeout(() => {
      setSubmitSuccess(false);
    }, 5000);

  } catch (error) {
    console.error('Erro ao enviar formulário:', error);
    setErrors({ submit: 'Erro ao agendar test drive. Tente novamente.' });
  } finally {
    setIsSubmitting(false);
  }
};

  const estados = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
    'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN',
    'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
  ];

  return (
    <div className="bg-white rounded-lg shadow-xl p-6 sm:p-8 lg:p-10 max-w-4xl mx-auto">
      {/* Cabeçalho */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Agendar Test Drive
        </h2>
        <p className="text-gray-600">
          {vehicleName
            ? `Preencha o formulário para agendar um test drive do ${vehicleName}`
            : 'Preencha o formulário para agendar seu test drive'}
        </p>
      </div>

      {/* Mensagem de Sucesso */}
      {submitSuccess && (
        <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
          <FiCheck className="w-6 h-6 text-green-600 flex-shrink-0" />
          <div>
            <p className="text-green-800 font-semibold">
              Test drive agendado com sucesso!
            </p>
            <p className="text-green-700 text-sm">
              Entraremos em contato em breve para confirmar.
            </p>
          </div>
        </div>
      )}

      {/* Formulário */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Dados Pessoais */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-900 border-b pb-2">
            Dados Pessoais
          </h3>

          {/* Nome Completo */}
          <div>
            <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-2">
              <FiUser className="inline mr-2" />
              Nome Completo *
            </label>
            <input
              type="text"
              id="nome"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent
                ${errors.nome ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Digite seu nome completo"
            />
            {errors.nome && (
              <p className="mt-1 text-sm text-red-600">{errors.nome}</p>
            )}
          </div>

          {/* Email e Telefone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                <FiMail className="inline mr-2" />
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent
                  ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="seu@email.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="telefone" className="block text-sm font-medium text-gray-700 mb-2">
                <FiPhone className="inline mr-2" />
                Telefone *
              </label>
              <input
                type="tel"
                id="telefone"
                name="telefone"
                value={formData.telefone}
                onChange={handleChange}
                maxLength="15"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent
                  ${errors.telefone ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="(11) 98765-4321"
              />
              {errors.telefone && (
                <p className="mt-1 text-sm text-red-600">{errors.telefone}</p>
              )}
            </div>
          </div>

          {/* CPF */}
          <div>
            <label htmlFor="cpf" className="block text-sm font-medium text-gray-700 mb-2">
              CPF *
            </label>
            <input
              type="text"
              id="cpf"
              name="cpf"
              value={formData.cpf}
              onChange={handleChange}
              maxLength="14"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent
                ${errors.cpf ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="000.000.000-00"
            />
            {errors.cpf && (
              <p className="mt-1 text-sm text-red-600">{errors.cpf}</p>
            )}
          </div>

          {/* Cidade e Estado */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <label htmlFor="cidade" className="block text-sm font-medium text-gray-700 mb-2">
                <FiMapPin className="inline mr-2" />
                Cidade *
              </label>
              <input
                type="text"
                id="cidade"
                name="cidade"
                value={formData.cidade}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent
                  ${errors.cidade ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="Digite sua cidade"
              />
              {errors.cidade && (
                <p className="mt-1 text-sm text-red-600">{errors.cidade}</p>
              )}
            </div>

            <div>
              <label htmlFor="estado" className="block text-sm font-medium text-gray-700 mb-2">
                Estado *
              </label>
              <select
                id="estado"
                name="estado"
                value={formData.estado}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent
                  ${errors.estado ? 'border-red-500' : 'border-gray-300'}`}
              >
                <option value="">UF</option>
                {estados.map(estado => (
                  <option key={estado} value={estado}>{estado}</option>
                ))}
              </select>
              {errors.estado && (
                <p className="mt-1 text-sm text-red-600">{errors.estado}</p>
              )}
            </div>
          </div>
        </div>

        {/* Preferências de Agendamento */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-900 border-b pb-2">
            Preferências de Agendamento
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Data */}
            <div>
              <label htmlFor="dataPreferencial" className="block text-sm font-medium text-gray-700 mb-2">
                <FiCalendar className="inline mr-2" />
                Data Preferencial *
              </label>
              <input
                type="date"
                id="dataPreferencial"
                name="dataPreferencial"
                value={formData.dataPreferencial}
                onChange={handleChange}
                min={new Date().toISOString().split('T')[0]}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent
                  ${errors.dataPreferencial ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.dataPreferencial && (
                <p className="mt-1 text-sm text-red-600">{errors.dataPreferencial}</p>
              )}
            </div>

            {/* Horário */}
            <div>
              <label htmlFor="horarioPreferencial" className="block text-sm font-medium text-gray-700 mb-2">
                <FiClock className="inline mr-2" />
                Horário Preferencial *
              </label>
              <select
                id="horarioPreferencial"
                name="horarioPreferencial"
                value={formData.horarioPreferencial}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent
                  ${errors.horarioPreferencial ? 'border-red-500' : 'border-gray-300'}`}
              >
                <option value="">Selecione</option>
                <option value="09:00">09:00</option>
                <option value="10:00">10:00</option>
                <option value="11:00">11:00</option>
                <option value="13:00">13:00</option>
                <option value="14:00">14:00</option>
                <option value="15:00">15:00</option>
                <option value="16:00">16:00</option>
                <option value="17:00">17:00</option>
              </select>
              {errors.horarioPreferencial && (
                <p className="mt-1 text-sm text-red-600">{errors.horarioPreferencial}</p>
              )}
            </div>
          </div>

          {/* Mensagem Adicional */}
          <div>
            <label htmlFor="mensagem" className="block text-sm font-medium text-gray-700 mb-2">
              Mensagem Adicional (Opcional)
            </label>
            <textarea
              id="mensagem"
              name="mensagem"
              value={formData.mensagem}
              onChange={handleChange}
              rows="4"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
              placeholder="Alguma observação ou preferência adicional?"
            />
          </div>
        </div>

        {/* Erro de Submit */}
        {errors.submit && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-800">{errors.submit}</p>
          </div>
        )}

        {/* Botão de Envio */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-primary text-white px-8 py-4 rounded-lg font-semibold text-lg
              hover:bg-blue-600 transform hover:scale-[1.02] transition-all duration-300
              shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed
              disabled:transform-none flex items-center justify-center gap-2`}
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Enviando...
              </>
            ) : (
              <>
                <FiCalendar className="w-5 h-5" />
                Agendar Test Drive
              </>
            )}
          </button>
        </div>

        {/* Nota */}
        <p className="text-sm text-gray-500 text-center">
          * Campos obrigatórios
        </p>
      </form>
    </div>
  );
};

export default TestDriveForm;
