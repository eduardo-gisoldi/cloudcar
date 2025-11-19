import { useState, useEffect } from 'react';
import { FiDollarSign, FiShoppingCart, FiCalendar, FiRefreshCw, FiUsers } from 'react-icons/fi';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import { getClientes, getTestDrives, getFinanciamentos, getVendas } from '../../services/api';

/**
 * Componente Admin - Painel administrativo
 * Gerencia clientes, financiamentos, vendas e test drives
 */
const Admin = () => {
  const [activeTab, setActiveTab] = useState('clientes');
  const [clientes, setClientes] = useState([]);
  const [financiamentos, setFinanciamentos] = useState([]);
  const [vendas, setVendas] = useState([]);
  const [testDrives, setTestDrives] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    setError(null);

    try {
      // Buscar todos os dados do backend em paralelo
      const [clientesData, testDrivesData, financiamentosData, vendasData] = await Promise.all([
        getClientes(),
        getTestDrives(),
        getFinanciamentos(),
        getVendas(),
      ]);

      setClientes(clientesData);
      setTestDrives(testDrivesData);
      setFinanciamentos(financiamentosData);
      setVendas(vendasData);
    } catch (err) {
      setError('Erro ao carregar dados. Verifique se o servidor está rodando na porta 5000.');
      console.error('Erro ao carregar dados:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  const formatTime = (timeString) => {
    if (!timeString) return '-';
    return timeString.slice(0, 5); // Pega apenas HH:MM
  };

  const TabButton = ({ icon: Icon, label, tabName, count }) => (
    <button
      onClick={() => setActiveTab(tabName)}
      className={`flex items-center gap-2 px-4 md:px-6 py-3 font-medium transition-all duration-300 border-b-2 text-sm md:text-base ${
        activeTab === tabName
          ? 'text-primary border-primary'
          : 'text-gray-600 border-transparent hover:text-primary hover:border-primary/50'
      }`}
    >
      <Icon className="w-4 h-4 md:w-5 md:h-5" />
      <span className="hidden sm:inline">{label}</span>
      <span className="sm:hidden">{label.split(' ')[0]}</span>
      <span className="ml-1 bg-primary text-white text-xs rounded-full px-2 py-0.5">
        {count}
      </span>
    </button>
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-grow pt-24 pb-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Título e botão de refresh */}
          <div className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-secondary mb-2">
                Painel Administrativo
              </h1>
              <p className="text-gray-600">
                Gerencie clientes, financiamentos, vendas e test drives
              </p>
            </div>
            <button
              onClick={loadData}
              disabled={loading}
              className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-600
                       transition-colors duration-300 flex items-center gap-2 disabled:opacity-50"
            >
              <FiRefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Atualizar</span>
            </button>
          </div>

          {/* Loading */}
          {loading && (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-gray-600">Carregando dados do servidor...</p>
            </div>
          )}

          {/* Error */}
          {error && !loading && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
              <p className="text-red-800 mb-4">{error}</p>
              <button
                onClick={loadData}
                className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700"
              >
                Tentar Novamente
              </button>
            </div>
          )}

          {/* Tabs e Conteúdo */}
          {!loading && !error && (
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* Tabs */}
              <div className="flex border-b overflow-x-auto">
                <TabButton
                  icon={FiUsers}
                  label="Clientes"
                  tabName="clientes"
                  count={clientes.length}
                />
                <TabButton
                  icon={FiCalendar}
                  label="Test Drives"
                  tabName="testdrives"
                  count={testDrives.length}
                />
                <TabButton
                  icon={FiDollarSign}
                  label="Financiamentos"
                  tabName="financiamentos"
                  count={financiamentos.length}
                />
                <TabButton
                  icon={FiShoppingCart}
                  label="Vendas"
                  tabName="vendas"
                  count={vendas.length}
                />
              </div>

              {/* Conteúdo das Tabs */}
              <div className="p-4 md:p-6">
                {/* Aba Clientes */}
                {activeTab === 'clientes' && (
                  <div>
                    <h2 className="text-xl md:text-2xl font-bold text-secondary mb-6">
                      Clientes Cadastrados ({clientes.length})
                    </h2>
                    {clientes.length === 0 ? (
                      <div className="text-center py-12 text-gray-500">
                        <FiUsers className="w-16 h-16 mx-auto mb-4 opacity-50" />
                        <p>Nenhum cliente cadastrado ainda</p>
                      </div>
                    ) : (
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nome</th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Telefone</th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">CPF</th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cidade/UF</th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cadastro</th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {clientes.map((cliente) => (
                              <tr key={cliente.id} className="hover:bg-gray-50">
                                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{cliente.id}</td>
                                <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{cliente.nome}</td>
                                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{cliente.email}</td>
                                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{cliente.telefone}</td>
                                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{cliente.cpf}</td>
                                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {cliente.cidade && cliente.estado ? `${cliente.cidade}/${cliente.estado}` : '-'}
                                </td>
                                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {formatDate(cliente.createdAt)}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                )}

                {/* Aba Test Drives */}
                {activeTab === 'testdrives' && (
                  <div>
                    <h2 className="text-xl md:text-2xl font-bold text-secondary mb-6">
                      Test Drives Agendados ({testDrives.length})
                    </h2>
                    {testDrives.length === 0 ? (
                      <div className="text-center py-12 text-gray-500">
                        <FiCalendar className="w-16 h-16 mx-auto mb-4 opacity-50" />
                        <p>Nenhum test drive agendado ainda</p>
                      </div>
                    ) : (
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Data</th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Horário</th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cliente</th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contato</th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Mensagem</th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {testDrives.map((td) => (
                              <tr key={td.id} className="hover:bg-gray-50">
                                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{td.id}</td>
                                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{formatDate(td.data)}</td>
                                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{formatTime(td.horario)}</td>
                                <td className="px-4 py-4 whitespace-nowrap">
                                  <div className="text-sm font-medium text-gray-900">{td.Cliente?.nome || '-'}</div>
                                  <div className="text-sm text-gray-500">{td.Cliente?.cpf || '-'}</div>
                                </td>
                                <td className="px-4 py-4 whitespace-nowrap">
                                  <div className="text-sm text-gray-900">{td.Cliente?.email || '-'}</div>
                                  <div className="text-sm text-gray-500">{td.Cliente?.telefone || '-'}</div>
                                </td>
                                <td className="px-4 py-4 text-sm text-gray-500 max-w-xs truncate">
                                  {td.mensagem || '-'}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                )}

                {/* Aba Financiamentos */}
                {activeTab === 'financiamentos' && (
                  <div>
                    <h2 className="text-xl md:text-2xl font-bold text-secondary mb-6">
                      Financiamentos Solicitados ({financiamentos.length})
                    </h2>
                    {financiamentos.length === 0 ? (
                      <div className="text-center py-12 text-gray-500">
                        <FiDollarSign className="w-16 h-16 mx-auto mb-4 opacity-50" />
                        <p>Nenhum financiamento solicitado ainda</p>
                      </div>
                    ) : (
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cliente</th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Valor Veículo</th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Entrada</th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Parcelas</th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contato</th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Data</th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {financiamentos.map((fin) => (
                              <tr key={fin.id} className="hover:bg-gray-50">
                                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{fin.id}</td>
                                <td className="px-4 py-4 whitespace-nowrap">
                                  <div className="text-sm font-medium text-gray-900">{fin.Cliente?.nome || '-'}</div>
                                  <div className="text-sm text-gray-500">{fin.Cliente?.cpf || '-'}</div>
                                </td>
                                <td className="px-4 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                                  {formatCurrency(parseFloat(fin.valorVeiculo))}
                                </td>
                                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                                  {formatCurrency(parseFloat(fin.valorEntrada))}
                                </td>
                                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{fin.parcelas}x</td>
                                <td className="px-4 py-4 whitespace-nowrap">
                                  <div className="text-sm text-gray-900">{fin.Cliente?.email || '-'}</div>
                                  <div className="text-sm text-gray-500">{fin.Cliente?.telefone || '-'}</div>
                                </td>
                                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {formatDate(fin.createdAt)}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                )}

                {/* Aba Vendas */}
                {activeTab === 'vendas' && (
                  <div>
                    <h2 className="text-xl md:text-2xl font-bold text-secondary mb-6">
                      Vendas Feitas ({vendas.length})
                    </h2>
                    {vendas.length === 0 ? (
                      <div className="text-center py-12 text-gray-500">
                        <FiShoppingCart className="w-16 h-16 mx-auto mb-4 opacity-50" />
                        <p>Nenhuma venda registrada ainda</p>
                      </div>
                    ) : (
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Data</th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cliente</th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Valor Total</th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Forma Pagamento</th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Observações</th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {vendas.map((venda) => (
                              <tr key={venda.id} className="hover:bg-gray-50">
                                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{venda.id}</td>
                                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                                  {formatDate(venda.dataVenda)}
                                </td>
                                <td className="px-4 py-4 whitespace-nowrap">
                                  <div className="text-sm font-medium text-gray-900">{venda.Cliente?.nome || '-'}</div>
                                  <div className="text-sm text-gray-500">{venda.Cliente?.cpf || '-'}</div>
                                </td>
                                <td className="px-4 py-4 whitespace-nowrap text-sm font-semibold text-green-600">
                                  {formatCurrency(parseFloat(venda.valorTotal))}
                                </td>
                                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                                  {venda.formaPagamento}
                                </td>
                                <td className="px-4 py-4 text-sm text-gray-500 max-w-xs truncate">
                                  {venda.observacoes || '-'}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Admin;
