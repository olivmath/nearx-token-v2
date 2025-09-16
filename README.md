# NearX Token - Passkey Frontend

Frontend simples com integração passkey para autenticação usando Stellar.

## 🚀 Como executar

1. **Instalar dependências** (opcional - o projeto usa CDN):
   ```bash
   npm install
   ```

2. **Executar servidor local**:
   ```bash
   npm run dev
   ```
   ou
   ```bash
   python3 -m http.server 8000
   ```

3. **Abrir no navegador**:
   ```
   http://localhost:8000
   ```

## 📱 Funcionalidades

- ✅ **Login com Passkey**: Autenticação segura usando WebAuthn
- ✅ **Tela de Login**: Interface simples e intuitiva
- ✅ **Tela Pós-Login**: Mensagem "VC LOGOU" após autenticação
- ✅ **Logout**: Funcionalidade para sair do sistema
- ✅ **Persistência**: Sessão mantida no localStorage

## 🛠️ Tecnologias

- **HTML5**: Estrutura da aplicação
- **CSS3**: Estilização moderna com gradientes
- **JavaScript ES6+**: Lógica da aplicação
- **Passkey Kit**: SDK para autenticação Stellar
- **Stellar SDK**: Integração com blockchain Stellar

## 📋 Estrutura do Projeto

```
nearx-token-v2/
├── index.html      # Página principal
├── app.js          # Lógica da aplicação
├── package.json    # Configurações do projeto
└── README.md       # Este arquivo
```

## 🔧 Configuração

O projeto está configurado para usar:
- **Rede**: Stellar Testnet
- **RPC**: https://soroban-testnet.stellar.org
- **Passkey Kit**: Versão mais recente via CDN

## ⚠️ Nota Importante

Este é um projeto de demonstração. Para produção, certifique-se de:
- Configurar corretamente os contratos Stellar
- Implementar tratamento de erros robusto
- Adicionar validações de segurança
- Usar HTTPS em produção

## 🎯 Como usar

1. Clique em "Login com Passkey"
2. Aguarde o processamento (simulado)
3. Veja a mensagem "VC LOGOU!"
4. Clique em "Logout" para sair

Simples assim! 🎉