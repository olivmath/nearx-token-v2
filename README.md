# 🔐 NearX Token - Touch ID Authentication

Frontend moderno com integração real de passkeys e Touch ID para autenticação segura usando Stellar.

## 🚀 Como executar

### **Opção 1: Frontend apenas**
```bash
npm run dev
# ou
python3 -m http.server 8000
```
Acesse: http://localhost:8000

### **Opção 2: Frontend + Backend (Recomendado)**
```bash
# Instalar dependências do servidor
cd server && npm install

# Voltar para raiz e executar tudo
cd .. && npm run start:full
```
- Frontend: http://localhost:8000
- Backend API: http://localhost:3001

## 📱 Funcionalidades

### **✅ Touch ID Real:**
- **Autenticação nativa** com Touch ID no macOS
- **Face ID** no iOS
- **Passkeys reais** usando WebAuthn
- **Modal visual** dedicado para Touch ID

### **✅ Interface Moderna:**
- **Design responsivo** e intuitivo
- **Animações suaves** durante autenticação
- **Feedback visual** em tempo real
- **Informações da carteira** com botões copiar

### **✅ Funcionalidades Completas:**
- **Criar nova carteira** com Touch ID
- **Login com carteira existente**
- **Persistência de sessão** no localStorage
- **Logout seguro**
- **API backend** para integração

## 🛠️ Tecnologias

### **Frontend:**
- **HTML5** + **CSS3** + **JavaScript ES6+**
- **Passkey Kit** - SDK oficial para Stellar
- **WebAuthn** - Padrão de autenticação
- **Touch ID/Face ID** - Autenticação biométrica

### **Backend:**
- **Express.js** - Servidor Node.js
- **CORS** - Cross-origin requests
- **API REST** - Endpoints mock para desenvolvimento

## 📋 Estrutura do Projeto

```
nearx-token-v2/
├── index.html              # Página principal
├── app.js                  # Aplicação principal
├── package.json            # Configurações do projeto
├── .env.local              # Variáveis de ambiente
├── config/
│   └── environment.js      # Configurações Stellar
├── services/
│   └── PasskeyService.js   # Serviço de passkeys
├── components/
│   └── TouchIDModal.js     # Modal Touch ID
├── server/
│   ├── server.js           # Servidor backend
│   └── package.json        # Dependências do servidor
└── README.md               # Este arquivo
```

## 🔧 Configuração

### **Variáveis de Ambiente (.env.local):**
```env
VITE_RPC_URL=https://soroban-testnet.stellar.org:443
VITE_NETWORK_PASSPHRASE=Test SDF Network ; September 2015
VITE_FACTORY_CONTRACT_ID=CDLZFC3SYJYDZT7K67VZ75HPJVIEUVNIXF47ZG2FB2RMQQAHHAGK6Z6E
VITE_WALLET_WASM_HASH=0102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f20
VITE_API_URL=http://localhost:3001
```

### **Rede Stellar:**
- **Rede:** Testnet
- **RPC:** https://soroban-testnet.stellar.org:443
- **Passphrase:** Test SDF Network ; September 2015

## 🎯 Como usar

### **1. Primeira vez:**
1. Acesse http://localhost:8000
2. Clique em **"✨ Criar Nova Carteira"**
3. **Modal Touch ID** aparecerá
4. Use **Touch ID** no Mac ou **Face ID** no iPhone
5. Veja as **informações da carteira** criada

### **2. Login subsequente:**
1. Clique em **"🍎 Login com Touch ID"**
2. **Modal Touch ID** aparecerá
3. Use **Touch ID/Face ID** para autenticar
4. Acesse suas **informações da carteira**

### **3. Funcionalidades:**
- **Copiar endereço** da carteira
- **Copiar Key ID** da passkey
- **Ver timestamp** de conexão
- **Desconectar** quando necessário

## 🍎 Compatibilidade Touch ID

### **✅ Totalmente Suportado:**
- **Safari no macOS** - Touch ID
- **Safari no iOS** - Face ID/Touch ID
- **Chrome no macOS** - Touch ID
- **Edge no macOS** - Touch ID

### **⚠️ Limitado:**
- **Firefox** - Suporte limitado ao WebAuthn
- **Navegadores antigos** - Sem suporte

## 🔍 Debugging

### **Console logs esperados:**
```
🚀 Inicializando NearX Token App...
✅ NearX Token App inicializado com sucesso
🍎 Iniciando login com Touch ID...
🔧 Iniciando configuração do PasskeyKit...
✅ PasskeyKit inicializado com sucesso
🔐 Solicitando criação de Passkey...
✅ Passkey criado com sucesso
✅ Carteira NearX criada
```

### **Se não funcionar:**
1. Verifique se **Touch ID está habilitado**
2. Teste em **Safari** (recomendado)
3. Verifique **iCloud Keychain**
4. Reinicie o navegador se necessário

## 🎨 Interface

### **Tela de Login:**
- Logo NearX Token
- Botão "Login com Touch ID"
- Botão "Criar Nova Carteira"
- Loading spinner durante autenticação

### **Tela Logada:**
- Mensagem de sucesso
- Informações da carteira
- Botões para copiar dados
- Botão desconectar

### **Modal Touch ID:**
- Ícone animado Touch ID
- Instruções específicas para macOS
- Pulsos visuais durante aguardo
- Design moderno e intuitivo

## 🚀 Status

**✅ Touch ID implementado e funcionando**  
**✅ Passkeys reais integradas**  
**✅ Interface moderna criada**  
**✅ Backend API configurado**  
**✅ Compatibilidade verificada**  

O projeto está **pronto** para autenticação com Touch ID! 🎉