// Aplicação NearX Token com Touch ID
import { passkeyService } from './services/PasskeyService.js';
import { TouchIDModal } from './components/TouchIDModal.js';

class NearXApp {
    constructor() {
        this.touchIDModal = new TouchIDModal();
        this.isAuthenticating = false;
        this.currentUser = null;
        this.init();
    }

    async init() {
        try {
            console.log('🚀 Inicializando NearX Token App...');
            
            // Verificar se já existe uma sessão ativa
            this.checkExistingSession();
            
            // Configurar event listeners
            this.setupEventListeners();
            
            console.log('✅ NearX Token App inicializado com sucesso');
            
        } catch (error) {
            console.error('❌ Erro ao inicializar aplicação:', error);
            this.showError('Erro ao inicializar aplicação');
        }
    }

    setupEventListeners() {
        const loginBtn = document.getElementById('loginBtn');
        const createBtn = document.getElementById('createBtn');
        const logoutBtn = document.getElementById('logoutBtn');

        loginBtn?.addEventListener('click', () => this.handleLogin());
        createBtn?.addEventListener('click', () => this.handleCreateWallet());
        logoutBtn?.addEventListener('click', () => this.handleLogout());
    }

    async handleLogin() {
        if (this.isAuthenticating) return;
        
        this.isAuthenticating = true;
        this.showLoading(true);
        this.hideError();
        this.touchIDModal.show();
        
        try {
            console.log('🍎 Iniciando login com Touch ID...');
            
            // Tentar conectar com carteira existente
            const user = await passkeyService.connectWallet();
            
            if (user) {
                this.currentUser = user;
                this.showLoggedScreen();
                console.log('✅ Login realizado com sucesso!', user);
            } else {
                this.showError('Nenhuma carteira encontrada. Crie uma nova carteira primeiro.');
            }
            
        } catch (error) {
            console.error('❌ Erro no login:', error);
            this.showError('Erro ao fazer login: ' + error.message);
        } finally {
            this.isAuthenticating = false;
            this.showLoading(false);
            this.touchIDModal.hide();
        }
    }

    async handleCreateWallet() {
        if (this.isAuthenticating) return;
        
        this.isAuthenticating = true;
        this.showLoading(true);
        this.hideError();
        this.touchIDModal.show();
        
        try {
            console.log('✨ Criando nova carteira com Touch ID...');
            
            // Criar nova carteira
            const user = await passkeyService.createWallet();
            
            if (user) {
                this.currentUser = user;
                this.showLoggedScreen();
                console.log('✅ Carteira criada com sucesso!', user);
            }
            
        } catch (error) {
            console.error('❌ Erro ao criar carteira:', error);
            this.showError('Erro ao criar carteira: ' + error.message);
        } finally {
            this.isAuthenticating = false;
            this.showLoading(false);
            this.touchIDModal.hide();
        }
    }


    async handleLogout() {
        try {
            await passkeyService.disconnect();
            this.currentUser = null;
            this.showLoginScreen();
            console.log('✅ Logout realizado com sucesso!');
        } catch (error) {
            console.error('❌ Erro no logout:', error);
            // Mesmo com erro, limpar a sessão local
            this.currentUser = null;
            this.showLoginScreen();
        }
    }

    checkExistingSession() {
        // Verificar se existe usuário salvo
        const storedUser = passkeyService.loadStoredUser();
        if (storedUser) {
            this.currentUser = storedUser;
            this.showLoggedScreen();
            console.log('✅ Sessão restaurada:', storedUser);
        }
    }

    showLoginScreen() {
        document.getElementById('loginScreen').style.display = 'block';
        document.getElementById('loggedScreen').style.display = 'none';
    }

    showLoggedScreen() {
        document.getElementById('loginScreen').style.display = 'none';
        document.getElementById('loggedScreen').style.display = 'block';
        
        // Atualizar informações do usuário
        if (this.currentUser) {
            document.getElementById('userName').textContent = this.currentUser.displayName;
            document.getElementById('contractAddress').textContent = this.currentUser.contractAddress;
            document.getElementById('keyId').textContent = this.currentUser.keyIdBase64;
            document.getElementById('connectedAt').textContent = new Date(this.currentUser.timestamp).toLocaleString('pt-BR');
        }
    }

    showLoading(show) {
        const loading = document.getElementById('loading');
        const loginBtn = document.getElementById('loginBtn');
        const createBtn = document.getElementById('createBtn');
        
        if (show) {
            loading.style.display = 'block';
            loginBtn.disabled = true;
            createBtn.disabled = true;
        } else {
            loading.style.display = 'none';
            loginBtn.disabled = false;
            createBtn.disabled = false;
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

// Função global para copiar texto
window.copyToClipboard = async function(elementId) {
    try {
        const element = document.getElementById(elementId);
        const text = element.textContent;
        await navigator.clipboard.writeText(text);
        
        // Mostrar feedback visual
        const button = event.target;
        const originalText = button.textContent;
        button.textContent = 'Copiado!';
        button.style.background = '#28a745';
        
        setTimeout(() => {
            button.textContent = originalText;
            button.style.background = '#28a745';
        }, 2000);
        
    } catch (error) {
        console.error('Erro ao copiar:', error);
        alert('Erro ao copiar para a área de transferência');
    }
};

// Inicializar a aplicação quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Inicializando NearX Token App...');
    new NearXApp();
});

// Fallback para garantir que a aplicação seja inicializada
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new NearXApp();
    });
} else {
    new NearXApp();
}