// URL base da API (seu backend Node.js)
const API_BASE_URL = 'http://localhost:5000/api';

/**
 * Serviço centralizado para chamadas à API
 * Todas as requisições ao backend passam por aqui
 */

// ==================== CLIENTES ====================

export const getClientes = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/clientes`);
    if (!response.ok) throw new Error('Erro ao buscar clientes');
    return await response.json();
  } catch (error) {
    console.error('Erro:', error);
    throw error;
  }
};

export const createCliente = async (clienteData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/clientes/buscar-ou-criar`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(clienteData),
    });
    if (!response.ok) throw new Error('Erro ao criar/buscar cliente');
    return await response.json();
  } catch (error) {
    console.error('Erro:', error);
    throw error;
  }
};

// ==================== TEST DRIVES ====================

export const getTestDrives = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/testdrives`);
    if (!response.ok) throw new Error('Erro ao buscar test drives');
    return await response.json();
  } catch (error) {
    console.error('Erro:', error);
    throw error;
  }
};

export const createTestDrive = async (testDriveData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/testdrives`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testDriveData),
    });
    if (!response.ok) throw new Error('Erro ao criar test drive');
    return await response.json();
  } catch (error) {
    console.error('Erro:', error);
    throw error;
  }
};

// ==================== FINANCIAMENTOS ====================

export const getFinanciamentos = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/financiamentos`);
    if (!response.ok) throw new Error('Erro ao buscar financiamentos');
    return await response.json();
  } catch (error) {
    console.error('Erro:', error);
    throw error;
  }
};

export const createFinanciamento = async (financiamentoData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/financiamentos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(financiamentoData),
    });
    if (!response.ok) throw new Error('Erro ao criar financiamento');
    return await response.json();
  } catch (error) {
    console.error('Erro:', error);
    throw error;
  }
};

// ==================== VENDAS ====================

export const getVendas = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/vendas`);
    if (!response.ok) throw new Error('Erro ao buscar vendas');
    return await response.json();
  } catch (error) {
    console.error('Erro:', error);
    throw error;
  }
};

export const createVenda = async (vendaData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/vendas`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(vendaData),
    });
    if (!response.ok) throw new Error('Erro ao criar venda');
    return await response.json();
  } catch (error) {
    console.error('Erro:', error);
    throw error;
  }
};
