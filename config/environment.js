// Configurações de ambiente para NearX Token
export const ENV = {
  // URLs da rede Stellar Testnet
  RPC_URL: import.meta.env?.VITE_RPC_URL || 'https://soroban-testnet.stellar.org:443',
  NETWORK_PASSPHRASE: import.meta.env?.VITE_NETWORK_PASSPHRASE || 'Test SDF Network ; September 2015',
  // Hash do WASM da carteira inteligente (necessário pelo PasskeyKit)
  WALLET_WASM_HASH: import.meta.env?.VITE_WALLET_WASM_HASH || import.meta.env?.VITE_FACTORY_CONTRACT_ID || '0102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f20',
  
  // URLs do backend
  API_URL: import.meta.env?.VITE_API_URL || 'http://localhost:3001',
  
  // URLs opcionais para serviços externos
  LAUNCHTUBE_URL: import.meta.env?.VITE_LAUNCHTUBE_URL || '',
  MERCURY_URL: import.meta.env?.VITE_MERCURY_URL || '',
};

export function validateEnvironment() {
  const required = ['RPC_URL', 'NETWORK_PASSPHRASE', 'WALLET_WASM_HASH'];
  const missing = required.filter(key => !ENV[key]);
  
  if (missing.length > 0) {
    console.warn(`Configurações de ambiente ausentes: ${missing.join(', ')}`);
    console.warn('Valores atuais:', ENV);
  }
  
  console.log('Configurações do PasskeyKit:', {
    RPC_URL: ENV.RPC_URL,
    NETWORK_PASSPHRASE: ENV.NETWORK_PASSPHRASE,
    WALLET_WASM_HASH: ENV.WALLET_WASM_HASH?.substring(0, 20) + '...',
    API_URL: ENV.API_URL
  });
  
  return missing.length === 0;
}
