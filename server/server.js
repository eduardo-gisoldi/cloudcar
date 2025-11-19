// importar dependencias
const express = require('express')
const { Sequelize, DataTypes } = require('sequelize');

// criar app
const app = express()
app.use(express.json());

// permitir que o React (porta 3000) se conecte a este servidor
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});

// conectando ao MySQL
const sequelize = new Sequelize('cloudcar_db', 'root', '8169', {
  host: 'localhost',
  dialect: 'mysql'
});
// Testar conexão
sequelize.authenticate()
  .then(() => {
    console.log('✓ Conectado ao MySQL!');
  })
  .catch((error) => {
    console.log('✗ Erro ao conectar:', error.message);
  });

// Modelando Banco de dados:
// ==================== TABELAS ====================

const Cliente = sequelize.define('Cliente', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  telefone: {
    type: DataTypes.STRING,
    allowNull: false
  },
  cpf: {
    type: DataTypes.STRING(11),
    allowNull: false,
    unique: true
  },
  cidade: {
    type: DataTypes.STRING,
    allowNull: true
  },
  estado: {
    type: DataTypes.STRING(2),
    allowNull: true,
    validate: {
      isIn: [["AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA",
            "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN",
            "RS", "RO", "RR", "SC", "SP", "SE", "TO"]]  // Apenas esses valores são permitidos
    }
  },
  renda: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true
  }
});

const TestDrive = sequelize.define('TestDrive', {
  data: {
    type: DataTypes.DATEONLY,  // (YYYY-MM-DD)
    allowNull: false
  },
  horario: {
    type: DataTypes.TIME,  // (HH:MM:SS)
    allowNull: false
  },
  mensagem: {
    type: DataTypes.TEXT,
    allowNull: true
  }
  // clienteId será criado automaticamente pela associação
});

// Tabela Financiamento
const Financiamento = sequelize.define('Financiamento', {
  valorVeiculo: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  valorEntrada: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  parcelas: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      isIn: [[12, 24, 36, 48, 60, 72]]  // Apenas esses valores são permitidos
    }
  }
  // clienteId será criado automaticamente pela associação
});

// Tabela Vendas
const Vendas = sequelize.define('Vendas', {
  dataVenda: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW  // Data atual por padrão
  },
  valorTotal: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  formaPagamento: {
    type: DataTypes.STRING,  // Ex: "À vista", "Financiado"
    allowNull: false
  },
  observacoes: {
    type: DataTypes.TEXT,
    allowNull: true
  }
  // clienteId e financiamentoId serão criados pelas associações
});

// ==================== RELAÇÕES ENTRE TABELAS ====================

// Um Cliente pode ter vários TestDrives
Cliente.hasMany(TestDrive, {
  foreignKey: 'clienteId',
  onDelete: 'CASCADE'  // Se deletar o cliente, deleta os test drives também
});
TestDrive.belongsTo(Cliente, {
  foreignKey: 'clienteId'
});

// Um Cliente pode ter vários Financiamentos
Cliente.hasMany(Financiamento, {
  foreignKey: 'clienteId',
  onDelete: 'CASCADE'
});
Financiamento.belongsTo(Cliente, {
  foreignKey: 'clienteId'
});

// Um Cliente pode ter várias Vendas
Cliente.hasMany(Vendas, {
  foreignKey: 'clienteId',
  onDelete: 'RESTRICT'  // Não pode deletar cliente se ele tem vendas
});
Vendas.belongsTo(Cliente, {
  foreignKey: 'clienteId'
});

// Uma Venda pode ter um Financiamento (opcional)
Financiamento.hasOne(Vendas, {
  foreignKey: 'financiamentoId',
  onDelete: 'SET NULL'  // Se deletar o financiamento, apenas remove a referência
});
Vendas.belongsTo(Financiamento, {
  foreignKey: 'financiamentoId',
  allowNull: true  // Venda pode ser sem financiamento (à vista)
});

// ==================== CRIAR TABELAS ====================

// Cria todas as tabelas no banco de dados
sequelize.sync()
  .then(() => {
    console.log('Todas as tabelas foram criadas!');
  })
  .catch((error) => {
    console.log('Erro ao criar tabelas:', error.message);
  });

// ==================== ROTAS ====================

// Rota de teste
app.get('/', (req, res) => {
  res.send('API CloudCar funcionando!');
});

// ===== ROTAS DE CLIENTES =====

// Buscar todos os clientes
app.get('/api/clientes', async (req, res) => {
  try {
    const clientes = await Cliente.findAll();
    res.json(clientes);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});

// Buscar um cliente específico por ID
app.get('/api/clientes/:id', async (req, res) => {
  try {
    const cliente = await Cliente.findByPk(req.params.id);
    if (!cliente) {
      return res.status(404).json({ erro: 'Cliente não encontrado' });
    }
    res.json(cliente);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});

// Criar um novo cliente
app.post('/api/clientes', async (req, res) => {
  try {
    const { nome, email, telefone, cpf, cidade, estado, renda } = req.body;
    const novoCliente = await Cliente.create({
      nome, email, telefone, cpf, cidade, estado, renda
    });
    res.status(201).json(novoCliente);
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
});

// Atualizar um cliente
app.put('/api/clientes/:id', async (req, res) => {
  try {
    const cliente = await Cliente.findByPk(req.params.id);
    if (!cliente) {
      return res.status(404).json({ erro: 'Cliente não encontrado' });
    }
    await cliente.update(req.body);
    res.json(cliente);
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
});

// Deletar um cliente
app.delete('/api/clientes/:id', async (req, res) => {
  try {
    const cliente = await Cliente.findByPk(req.params.id);
    if (!cliente) {
      return res.status(404).json({ erro: 'Cliente não encontrado' });
    }
    await cliente.destroy();
    res.json({ mensagem: 'Cliente deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});

// ===== ROTAS DE TEST DRIVE =====

// Buscar todos os test drives (com dados do cliente)
app.get('/api/testdrives', async (req, res) => {
  try {
    const testDrives = await TestDrive.findAll({
      include: Cliente
    });
    res.json(testDrives);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});

// Criar um novo test drive
app.post('/api/testdrives', async (req, res) => {
  try {
    const { clienteId, data, horario, mensagem } = req.body;
    const novoTestDrive = await TestDrive.create({
      clienteId, data, horario, mensagem
    });
    res.status(201).json(novoTestDrive);
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
});

// ===== ROTAS DE FINANCIAMENTO =====

// Buscar todos os financiamentos (com dados do cliente)
app.get('/api/financiamentos', async (req, res) => {
  try {
    const financiamentos = await Financiamento.findAll({
      include: Cliente
    });
    res.json(financiamentos);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});

// Criar um novo financiamento
app.post('/api/financiamentos', async (req, res) => {
  try {
    const { clienteId, valorVeiculo, valorEntrada, parcelas } = req.body;
    const novoFinanciamento = await Financiamento.create({
      clienteId, valorVeiculo, valorEntrada, parcelas
    });
    res.status(201).json(novoFinanciamento);
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
});

// ===== ROTAS DE VENDAS =====

// Buscar todas as vendas (com cliente e financiamento)
app.get('/api/vendas', async (req, res) => {
  try {
    const vendas = await Vendas.findAll({
      include: [Cliente, Financiamento]
    });
    res.json(vendas);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});

// Criar uma nova venda
app.post('/api/vendas', async (req, res) => {
  try {
    const { clienteId, financiamentoId, valorTotal, formaPagamento, observacoes } = req.body;
    const novaVenda = await Vendas.create({
      clienteId,
      financiamentoId,
      valorTotal,
      formaPagamento,
      observacoes
    });
    res.status(201).json(novaVenda);
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
});



// Servidor Rodando
app.listen(5000, () => {
  console.log('Servidor rodando em http://localhost:5000');
});
