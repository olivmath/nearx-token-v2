// Configuração do Stellar e Passkey Kit
const STELLAR_CONFIG = {
    rpcUrl: 'https://soroban-testnet.stellar.org',
    networkPassphrase: 'Test SDF Network ; September 2015',
    factoryContractId: 'CDLZFC3SYJYDZT7K67VZ75HPJVIEUVNIXF47ZG2FB2RMQQAHHAGK6Z6E' // Contract de exemplo
};

class PasskeyAuth {
    constructor() {
        this.passkeyKit = null;
        this.isLoggedIn = false;
        this.currentAccount = null;
        this.init();
    }

    async init() {
        try {
            // Importar passkey-kit dinamicamente
            const { PasskeyKit } = await import('https://unpkg.com/passkey-kit@latest/dist/index.js');
            
            this.passkeyKit = new PasskeyKit(STELLAR_CONFIG);
            console.log('PasskeyKit inicializado com sucesso');
            
            // Verificar se já existe uma sessão ativa
            this.checkExistingSession();
            
        } catch (error) {
            console.error('Erro ao inicializar PasskeyKit:', error);
            this.showError('Erro ao inicializar sistema de autenticação');
        }
        
        this.setupEventListeners();
    }

    setupEventListeners() {
        const loginBtn = document.getElementById('loginBtn');
        const logoutBtn = document.getElementById('logoutBtn');

        loginBtn?.addEventListener('click', () => this.handleLogin());
        logoutBtn?.addEventListener('click', () => this.handleLogout());
    }

    async handleLogin() {
        try {
            this.showLoading(true);
            this.hideError();
            
            console.log('Iniciando processo de login...');
            
            // Simular criação/login com passkey
            // Em um cenário real, você usaria os métodos do passkey-kit
            const mockAccount = await this.simulatePasskeyLogin();
            
            if (mockAccount) {
                this.currentAccount = mockAccount;
                this.isLoggedIn = true;
                this.showLoggedScreen();
                console.log('Login realizado com sucesso!');
            }
            
        } catch (error) {
            console.error('Erro no login:', error);
            this.showError('Erro ao fazer login. Tente novamente.');
        } finally {
            this.showLoading(false);
        }
    }

    async simulatePasskeyLogin() {
        // Simular delay de autenticação
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Simular criação de conta com passkey
        return {
            publicKey: 'GXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
            contractId: 'CXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
            timestamp: new Date().toISOString()
        };
    }

    handleLogout() {
        this.isLoggedIn = false;
        this.currentAccount = null;
        this.showLoginScreen();
        console.log('Logout realizado com sucesso!');
    }

    checkExistingSession() {
        // Verificar se existe sessão salva no localStorage
        const savedSession = localStorage.getItem('nearx-passkey-session');
        if (savedSession) {
            try {
                this.currentAccount = JSON.parse(savedSession);
                this.isLoggedIn = true;
                this.showLoggedScreen();
            } catch (error) {
                console.error('Erro ao recuperar sessão:', error);
                localStorage.removeItem('nearx-passkey-session');
            }
        }
    }

    showLoginScreen() {
        document.getElementById('loginScreen').style.display = 'block';
        document.getElementById('loggedScreen').style.display = 'none';
        localStorage.removeItem('nearx-passkey-session');
    }

    showLoggedScreen() {
        document.getElementById('loginScreen').style.display = 'none';
        document.getElementById('loggedScreen').style.display = 'block';
        
        // Salvar sessão
        if (this.currentAccount) {
            localStorage.setItem('nearx-passkey-session', JSON.stringify(this.currentAccount));
        }
    }

    showLoading(show) {
        const loading = document.getElementById('loading');
        const loginBtn = document.getElementById('loginBtn');
        
        if (show) {
            loading.style.display = 'block';
            loginBtn.disabled = true;
        } else {
            loading.style.display = 'none';
            loginBtn.disabled = false;
        }
    }

    showError(message) {
        const errorDiv = document.getElementById('error');
        errorDiv.textContent = message;
        errorDiv.style.display = 'block';
    }

    hideError() {
        const errorDiv = document.getElementById('error');
        errorDiv.style.display = 'none';
    }
}

// Inicializar a aplicação quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    console.log('Inicializando NearX Token Passkey Auth...');
    new PasskeyAuth();
});

// Fallback para garantir que a aplicação seja inicializada
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new PasskeyAuth();
    });
} else {
    new PasskeyAuth();
}