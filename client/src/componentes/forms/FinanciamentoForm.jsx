import { useState, useEffect } from 'react';
import { FiDollarSign, FiUser, FiMail, FiPhone, FiPercent, FiCalendar, FiTrendingUp, FiCheck } from 'react-icons/fi';

/**
 * Componente FinanciamentoForm - Formulário para simulação de financiamento
 * Calcula parcelas e coleta informações do cliente
 * Pronto para integração com backend Node.js + Express + MySQL
 */
const FinanciamentoForm = ({ vehicleId, vehicleName, vehiclePrice = 0 }) => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    cpf: '',
    rendaMensal: '',
    valorVeiculo: vehiclePrice,
    valorEntrada: '',
    numeroParcelas: '48',
    veiculoId: vehicleId || ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [simulacao, setSimulacao] = useState(null);

  // Taxa de juros mensal (exemplo: 1.5% ao mês)
  const TAXA_JUROS_MENSAL = 0.015;

  // Calcula simulação do financiamento
  useEffect(() => {
    if (formData.valorVeiculo && formData.valorEntrada && formData.numeroParcelas) {
      const valorVeiculo = parseFloat(formData.valorVeiculo) || 0;
      const valorEntrada = parseFloat(formData.valorEntrada) || 0;
      const parcelas = parseInt(formData.numeroParcelas) || 1;

      if (valorVeiculo > 0 && valorEntrada < valorVeiculo && parcelas > 0) {
        const valorFinanciado = valorVeiculo - valorEntrada;

        // Cálculo usando Price (Sistema Francês de Amortização)
        const taxa = TAXA_JUROS_MENSAL;
        const coeficiente = (taxa * Math.pow(1 + taxa, parcelas)) / (Math.pow(1 + taxa, parcelas) - 1);
        const valorParcela = valorFinanciado * coeficiente;
        const valorTotal = (valorParcela * parcelas) + valorEntrada;
        const jurosTotal = valorTotal - valorVeiculo;

        setSimulacao({
          valorFinanciado: valorFinanciado.toFixed(2),
          valorParcela: valorParcela.toFixed(2),
          valorTotal: valorTotal.toFixed(2),
          jurosTotal: jurosTotal.toFixed(2),
          taxaJuros: (TAXA_JUROS_MENSAL * 100).toFixed(2)
        });
      } else {
        setSimulacao(null);
      }
    } else {
      setSimulacao(null);
    }
  }, [formData.valorVeiculo, formData.valorEntrada, formData.numeroParcelas]);

  // Validação de CPF
  const validarCPF = (cpf) => {
    cpf = cpf.replace(/[^\d]/g, '');
    if (cpf.length !== 11) return false;
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

    const rendaMensal = parseFloat(formData.rendaMensal);
    if (!formData.rendaMensal) {
      newErrors.rendaMensal = 'Renda mensal é obrigatória';
    } else if (rendaMensal < 1000) {
      newErrors.rendaMensal = 'Renda mensal deve ser pelo menos R$ 1.000,00';
    }

    const valorVeiculo = parseFloat(formData.valorVeiculo);
    if (!formData.valorVeiculo) {
      newErrors.valorVeiculo = 'Valor do veículo é obrigatório';
    } else if (valorVeiculo < 10000) {
      newErrors.valorVeiculo = 'Valor mínimo é R$ 10.000,00';
    }

    const valorEntrada = parseFloat(formData.valorEntrada);
    if (!formData.valorEntrada) {
      newErrors.valorEntrada = 'Valor da entrada é obrigatório';
    } else if (valorEntrada < 0) {
      newErrors.valorEntrada = 'Valor da entrada não pode ser negativo';
    } else if (valorEntrada >= valorVeiculo) {
      newErrors.valorEntrada = 'Entrada deve ser menor que o valor do veículo';
    } else if (valorEntrada < valorVeiculo * 0.1) {
      newErrors.valorEntrada = 'Entrada mínima é 10% do valor do veículo';
    }

    if (!formData.numeroParcelas) {
      newErrors.numeroParcelas = 'Número de parcelas é obrigatório';
    }

    // Verifica se a parcela não ultrapassa 30% da renda
    if (simulacao && rendaMensal) {
      const valorParcela = parseFloat(simulacao.valorParcela);
      const limiteRenda = rendaMensal * 0.3;
      if (valorParcela > limiteRenda) {
        newErrors.rendaMensal = 'Parcela não pode ultrapassar 30% da renda mensal';
      }
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

  const formatarMoeda = (valor) => {
    const numero = valor.replace(/\D/g, '');
    const valorFormatado = (parseFloat(numero) / 100).toFixed(2);
    return valorFormatado;
  };

  // Handler de mudança de input
  const handleChange = (e) => {
    const { name, value } = e.target;
    let valorFormatado = value;

    if (name === 'telefone') {
      valorFormatado = aplicarMascaraTelefone(value);
    } else if (name === 'cpf') {
      valorFormatado = aplicarMascaraCPF(value);
    } else if (name === 'rendaMensal' || name === 'valorVeiculo' || name === 'valorEntrada') {
      valorFormatado = formatarMoeda(value);
    }

    setFormData(prev => ({
      ...prev,
      [name]: valorFormatado
    }));

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
      const { createCliente, createFinanciamento } = await import('../../services/api');

      // 1. Criar ou buscar o cliente
      const clienteData = {
        nome: formData.nome,
        email: formData.email,
        telefone: formData.telefone.replace(/\D/g, ''),
        cpf: formData.cpf.replace(/\D/g, ''),
        cidade: null, // Financiamento não pede cidade
        estado: null,
        renda: parseFloat(formData.rendaMensal)
      };

      const cliente = await createCliente(clienteData);

      // 2. Criar o financiamento
      const financiamentoData = {
        clienteId: cliente.id,
        valorVeiculo: parseFloat(formData.valorVeiculo),
        valorEntrada: parseFloat(formData.valorEntrada),
        parcelas: parseInt(formData.numeroParcelas)
      };

      await createFinanciamento(financiamentoData);

      console.log('Financiamento simulado com sucesso!');
      setSubmitSuccess(true);

      // Limpa o formulário
      setFormData({
        nome: '',
        email: '',
        telefone: '',
        cpf: '',
        rendaMensal: '',
        valorVeiculo: vehiclePrice,
        valorEntrada: '',
        numeroParcelas: '48',
        veiculoId: vehicleId || ''
      });

      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);

    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
      setErrors({ submit: 'Erro ao enviar simulação. Tente novamente.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-xl p-6 sm:p-8 lg:p-10 max-w-5xl mx-auto">
      {/* Cabeçalho */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Simulação de Financiamento
        </h2>
        <p className="text-gray-600">
          {vehicleName
            ? `Simule o financiamento do ${vehicleName}`
            : 'Faça uma simulação e descubra as melhores condições'}
        </p>
      </div>

      {/* Mensagem de Sucesso */}
      {submitSuccess && (
        <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
          <FiCheck className="w-6 h-6 text-green-600 flex-shrink-0" />
          <div>
            <p className="text-green-800 font-semibold">
              Simulação enviada com sucesso!
            </p>
            <p className="text-green-700 text-sm">
              Nossa equipe analisará sua proposta e entrará em contato em breve.
            </p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Formulário */}
        <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-6">
          {/* Dados Pessoais */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900 border-b pb-2">
              Dados Pessoais
            </h3>

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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

              <div>
                <label htmlFor="rendaMensal" className="block text-sm font-medium text-gray-700 mb-2">
                  <FiTrendingUp className="inline mr-2" />
                  Renda Mensal *
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">
                    R$
                  </span>
                  <input
                    type="text"
                    id="rendaMensal"
                    name="rendaMensal"
                    value={formData.rendaMensal}
                    onChange={handleChange}
                    className={`w-full pl-12 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent
                      ${errors.rendaMensal ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="0,00"
                  />
                </div>
                {errors.rendaMensal && (
                  <p className="mt-1 text-sm text-red-600">{errors.rendaMensal}</p>
                )}
              </div>
            </div>
          </div>

          {/* Dados do Financiamento */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900 border-b pb-2">
              Dados do Financiamento
            </h3>

            <div>
              <label htmlFor="valorVeiculo" className="block text-sm font-medium text-gray-700 mb-2">
                <FiDollarSign className="inline mr-2" />
                Valor do Veículo *
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">
                  R$
                </span>
                <input
                  type="text"
                  id="valorVeiculo"
                  name="valorVeiculo"
                  value={formData.valorVeiculo}
                  onChange={handleChange}
                  className={`w-full pl-12 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent
                    ${errors.valorVeiculo ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="0,00"
                />
              </div>
              {errors.valorVeiculo && (
                <p className="mt-1 text-sm text-red-600">{errors.valorVeiculo}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="valorEntrada" className="block text-sm font-medium text-gray-700 mb-2">
                  <FiPercent className="inline mr-2" />
                  Valor de Entrada *
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">
                    R$
                  </span>
                  <input
                    type="text"
                    id="valorEntrada"
                    name="valorEntrada"
                    value={formData.valorEntrada}
                    onChange={handleChange}
                    className={`w-full pl-12 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent
                      ${errors.valorEntrada ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="0,00"
                  />
                </div>
                {errors.valorEntrada && (
                  <p className="mt-1 text-sm text-red-600">{errors.valorEntrada}</p>
                )}
                {formData.valorVeiculo && formData.valorEntrada && (
                  <p className="mt-1 text-sm text-gray-500">
                    {((parseFloat(formData.valorEntrada) / parseFloat(formData.valorVeiculo)) * 100).toFixed(0)}% do valor
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="numeroParcelas" className="block text-sm font-medium text-gray-700 mb-2">
                  <FiCalendar className="inline mr-2" />
                  Número de Parcelas *
                </label>
                <select
                  id="numeroParcelas"
                  name="numeroParcelas"
                  value={formData.numeroParcelas}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent
                    ${errors.numeroParcelas ? 'border-red-500' : 'border-gray-300'}`}
                >
                  <option value="12">12 meses</option>
                  <option value="24">24 meses</option>
                  <option value="36">36 meses</option>
                  <option value="48">48 meses</option>
                  <option value="60">60 meses</option>
                  <option value="72">72 meses</option>
                </select>
                {errors.numeroParcelas && (
                  <p className="mt-1 text-sm text-red-600">{errors.numeroParcelas}</p>
                )}
              </div>
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
              disabled={isSubmitting || !simulacao}
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
                  <FiCheck className="w-5 h-5" />
                  Enviar Proposta
                </>
              )}
            </button>
          </div>

          <p className="text-sm text-gray-500 text-center">
            * Campos obrigatórios
          </p>
        </form>

        {/* Resumo da Simulação */}
        <div className="lg:col-span-1">
          <div className="bg-gradient-to-br from-primary to-blue-600 rounded-lg p-6 text-white sticky top-6">
            <h3 className="text-2xl font-bold mb-6">Resumo da Simulação</h3>

            {simulacao ? (
              <div className="space-y-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <p className="text-sm opacity-90 mb-1">Valor Financiado</p>
                  <p className="text-2xl font-bold">
                    R$ {parseFloat(simulacao.valorFinanciado).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <p className="text-sm opacity-90 mb-1">Valor da Parcela</p>
                  <p className="text-3xl font-bold">
                    R$ {parseFloat(simulacao.valorParcela).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </p>
                  <p className="text-sm opacity-75 mt-1">
                    em {formData.numeroParcelas}x
                  </p>
                </div>

                <div className="space-y-3 pt-4 border-t border-white/20">
                  <div className="flex justify-between">
                    <span className="opacity-90">Taxa de Juros:</span>
                    <span className="font-semibold">{simulacao.taxaJuros}% a.m.</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-90">Total de Juros:</span>
                    <span className="font-semibold">
                      R$ {parseFloat(simulacao.jurosTotal).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                  <div className="flex justify-between text-lg font-bold pt-3 border-t border-white/20">
                    <span>Valor Total:</span>
                    <span>
                      R$ {parseFloat(simulacao.valorTotal).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>

                <div className="mt-6 text-xs opacity-75 leading-relaxed">
                  <p>* Simulação sujeita à análise de crédito.</p>
                  <p>* Valores e condições podem variar.</p>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <FiDollarSign className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p className="opacity-90">
                  Preencha os dados do financiamento para ver a simulação
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinanciamentoForm;
