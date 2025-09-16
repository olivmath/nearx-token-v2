// Servidor backend para NearX Token
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'NearX Token API funcionando' });
});

// Rota para obter contractId baseado em keyId (mock por enquanto)
app.get('/api/contract-id', async (req, res) => {
  try {
    const { keyId } = req.query;
    console.log('🔍 Buscando contractId para keyId:', keyId);
    
    // Mock: gerar contractId baseado no keyId
    const contractId = `C${keyId ? keyId.substring(0, 20) : 'MOCK'}`;
    
    console.log('✅ ContractId gerado:', contractId);
    res.json({ contractId });
  } catch (error) {
    console.error('❌ Erro ao obter contractId:', error);
    res.status(500).json({ error: 'Erro ao obter contractId' });
  }
});

// Rota para enviar transação (mock)
app.post('/api/send-transaction', async (req, res) => {
  try {
    const { transaction, signature } = req.body;
    console.log('📤 Recebendo transação:', { transaction, signature });
    
    // Mock: simular processamento da transação
    const result = {
      success: true,
      transactionHash: `TX${Date.now()}`,
      timestamp: new Date().toISOString()
    };
    
    console.log('✅ Transação processada:', result);
    res.json(result);
  } catch (error) {
    console.error('❌ Erro ao processar transação:', error);
    res.status(500).json({ error: 'Erro ao processar transação' });
  }
});

// Rota para obter signers de um contrato (mock)
app.get('/api/signers/:contractId', async (req, res) => {
  try {
    const { contractId } = req.params;
    console.log('👥 Buscando signers para contrato:', contractId);
    
    // Mock: retornar lista de signers
    const signers = [
      {
        publicKey: 'GXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
        weight: 1,
        type: 'ed25519_public_key'
      }
    ];
    
    console.log('✅ Signers encontrados:', signers);
    res.json({ signers });
  } catch (error) {
    console.error('❌ Erro ao buscar signers:', error);
    res.status(500).json({ error: 'Erro ao buscar signers' });
  }
});

// Rota para obter saldo da carteira (mock)
app.get('/api/balance/:contractId', async (req, res) => {
  try {
    const { contractId } = req.params;
    console.log('💰 Buscando saldo para contrato:', contractId);
    
    // Mock: retornar saldo simulado
    const balance = {
      xlm: '1000.0000000',
      usdc: '500.0000000',
      timestamp: new Date().toISOString()
    };
    
    console.log('✅ Saldo encontrado:', balance);
    res.json(balance);
  } catch (error) {
    console.error('❌ Erro ao buscar saldo:', error);
    res.status(500).json({ error: 'Erro ao buscar saldo' });
  }
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log('🚀 Servidor NearX Token (Mock) rodando na porta', PORT);
  console.log('📡 Health check: http://localhost:' + PORT + '/health');
  console.log('🔗 API endpoints disponíveis:');
  console.log('   GET  /api/contract-id?keyId=...');
  console.log('   POST /api/send-transaction');
  console.log('   GET  /api/signers/:contractId');
  console.log('   GET  /api/balance/:contractId');
});
