// Serviço de Passkey para NearX Token
import { ENV, validateEnvironment } from '../config/environment.js';

export class PasskeyService {
  constructor() {
    this.passkeyKit = null;
    this.isInitialized = false;
    this.currentUser = null;
  }

  async initialize() {
    try {
      console.log('🔧 Iniciando configuração do PasskeyKit...');
      
      if (!validateEnvironment()) {
        console.error('❌ Configurações de ambiente inválidas');
        return false;
      }

      console.log('✅ Configurações validadas, criando PasskeyKit...');
      
      // Importar PasskeyKit usando a mesma abordagem do front-novo
      let PasskeyKit;
      try {
        const module = await import('passkey-kit');
        PasskeyKit = module.PasskeyKit;
      } catch (error) {
        console.log('⚠️ Fallback para CDN...');
        const module = await import('https://cdn.skypack.dev/passkey-kit');
        PasskeyKit = module.PasskeyKit;
      }
      
      this.passkeyKit = new PasskeyKit({
        rpcUrl: ENV.RPC_URL,
        networkPassphrase: ENV.NETWORK_PASSPHRASE,
        walletWasmHash: ENV.WALLET_WASM_HASH,
      });

      this.isInitialized = true;
      console.log('✅ PasskeyKit inicializado com sucesso');
      return true;
    } catch (error) {
      console.error('❌ Erro ao inicializar PasskeyKit:', error);
      return false;
    }
  }

  isSupported() {
    return !!(
      window.PublicKeyCredential &&
      window.navigator.credentials &&
      window.navigator.credentials.create &&
      window.navigator.credentials.get
    );
  }

  async createWallet() {
    try {
      if (!this.isInitialized) {
        const initialized = await this.initialize();
        if (!initialized) {
          throw new Error('Falha ao inicializar PasskeyKit');
        }
      }

      if (!this.isSupported()) {
        console.error('❌ Navegador não suporta Passkey/WebAuthn');
        throw new Error('Navegador não suporta Passkey/WebAuthn');
      }

      console.log('🔐 Solicitando criação de Passkey...');
      
      // PasskeyKit usa automaticamente platform authenticators (Touch ID) quando disponível
      const result = await this.passkeyKit.createWallet('NearX Token', 'user');
      
      console.log('✅ Passkey criado com sucesso:', result);

      const user = {
        id: `user_${Date.now()}`,
        name: 'NearX User',
        displayName: 'Usuário NearX',
        contractAddress: result.contractId,
        keyIdBase64: result.keyIdBase64,
        publicKey: result.publicKey,
        timestamp: new Date().toISOString()
      };

      this.currentUser = user;
      this.saveUserToStorage(user);
      
      console.log('✅ Carteira NearX criada:', user);
      return user;
    } catch (error) {
      console.error('❌ Erro ao criar carteira:', error);
      throw error;
    }
  }

  async connectWallet() {
    try {
      if (!this.isInitialized) {
        const initialized = await this.initialize();
        if (!initialized) {
          throw new Error('Falha ao inicializar PasskeyKit');
        }
      }

      if (!this.isSupported()) {
        throw new Error('Navegador não suporta Passkey/WebAuthn');
      }

      // Tentar reconectar usando o keyId salvo (se houver)
      const stored = this.currentUser ?? this.loadStoredUser();
      const keyId = stored?.keyIdBase64;

      console.log('🔐 Conectando com Touch ID...');

      const res = await this.passkeyKit.connectWallet({
        keyId,
        getContractId: async (keyId) => {
          try {
            const response = await fetch(`${ENV.API_URL}/api/contract-id?keyId=${encodeURIComponent(keyId)}`);
            if (!response.ok) return undefined;
            const data = await response.json();
            return data.contractId;
          } catch (error) {
            console.warn('Erro ao buscar contractId do backend:', error);
            return undefined;
          }
        }
      });

      const user = {
        id: `user_${Date.now()}`,
        name: 'NearX User',
        displayName: 'Usuário NearX',
        contractAddress: res.contractId,
        keyIdBase64: res.keyIdBase64,
        publicKey: res.publicKey,
        timestamp: new Date().toISOString()
      };

      this.currentUser = user;
      this.saveUserToStorage(user);
      
      console.log('✅ Carteira NearX conectada:', user);
      return user;
    } catch (error) {
      console.error('❌ Erro ao conectar carteira:', error);
      throw error;
    }
  }

  async disconnect() {
    this.currentUser = null;
    this.removeUserFromStorage();
    console.log('✅ Usuário desconectado');
  }

  getCurrentUser() {
    return this.currentUser;
  }

  isLoggedIn() {
    return !!this.currentUser;
  }

  saveUserToStorage(user) {
    try {
      localStorage.setItem('nearx-passkey-user', JSON.stringify(user));
    } catch (error) {
      console.warn('Erro ao salvar usuário no localStorage:', error);
    }
  }

  loadStoredUser() {
    try {
      const stored = localStorage.getItem('nearx-passkey-user');
      return stored ? JSON.parse(stored) : null;
    } catch (error) {
      console.warn('Erro ao carregar usuário do localStorage:', error);
      return null;
    }
  }

  removeUserFromStorage() {
    try {
      localStorage.removeItem('nearx-passkey-user');
    } catch (error) {
      console.warn('Erro ao remover usuário do localStorage:', error);
    }
  }
}

// Instância singleton
export const passkeyService = new PasskeyService();
