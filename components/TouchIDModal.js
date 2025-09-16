// Modal Touch ID para NearX Token
export class TouchIDModal {
  constructor() {
    this.isVisible = false;
    this.modalElement = null;
    this.createModal();
  }

  createModal() {
    // Criar elemento do modal
    this.modalElement = document.createElement('div');
    this.modalElement.id = 'touch-id-modal';
    this.modalElement.innerHTML = `
      <div class="touch-id-overlay">
        <div class="touch-id-modal">
          <div class="touch-id-icon">
            <div class="touch-id-circle">
              <svg class="touch-id-svg" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.81 4.47c-.08 0-.16-.02-.23-.06C15.66 3.42 14 3 12.01 3c-1.98 0-3.86.47-5.57 1.41-.24.13-.54.04-.68-.2-.13-.24-.04-.55.2-.68C7.82 2.52 9.86 2 12.01 2c2.13 0 3.99.47 6.03 1.52.25.13.34.43.21.67-.09.18-.26.28-.44.28zM3.5 9.72c-.1 0-.2-.03-.29-.09-.23-.16-.28-.47-.12-.7.99-1.4 2.25-2.5 3.75-3.27C9.98 4.04 14 4.03 17.15 5.65c1.5.77 2.76 1.86 3.75 3.25.16.22.11.54-.12.7-.23.16-.54.11-.7-.12-.9-1.26-2.04-2.25-3.39-2.94-2.87-1.47-6.54-1.47-9.4.01-1.36.7-2.5 1.7-3.4 2.96-.08.14-.23.21-.39.21zm6.25 12.07c-.13 0-.26-.05-.35-.15-.87-.87-1.34-1.43-2.01-2.64-.69-1.23-1.05-2.73-1.05-4.34 0-2.97 2.54-5.39 5.66-5.39s5.66 2.42 5.66 5.39c0 1.61-.36 3.11-1.05 4.34-.67 1.21-1.14 1.77-2.01 2.64-.18.18-.43.18-.61 0-.87-.87-1.33-1.43-2.01-2.64C7.89 17.76 7.53 16.26 7.53 14.65c0-2.42 2.06-4.39 4.57-4.39s4.57 1.97 4.57 4.39c0 1.61-.36 3.11-1.05 4.34-.67 1.21-1.14 1.77-2.01 2.64-.09.1-.22.15-.35.15z"/>
              </svg>
            </div>
            <div class="touch-id-pulse"></div>
            <div class="touch-id-pulse-delayed"></div>
          </div>
          
          <h3 class="touch-id-title">Autenticação Touch ID</h3>
          <p class="touch-id-subtitle">Use o Touch ID para autenticar sua passkey</p>
          
          <div class="touch-id-instructions">
            <p class="touch-id-tip">
              💡 <strong>macOS:</strong> Coloque o dedo no sensor Touch ID ou use o Apple Watch
            </p>
          </div>
          
          <div class="touch-id-status">
            <div class="touch-id-indicator"></div>
            <span>Aguardando autenticação...</span>
          </div>
        </div>
      </div>
    `;

    // Adicionar estilos CSS
    this.addStyles();
    
    // Adicionar ao DOM
    document.body.appendChild(this.modalElement);
  }

  addStyles() {
    const style = document.createElement('style');
    style.textContent = `
      #touch-id-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 9999;
        display: none;
      }

      .touch-id-overlay {
        position: absolute;
        inset: 0;
        background: rgba(0, 0, 0, 0.6);
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 1rem;
      }

      .touch-id-modal {
        background: white;
        border-radius: 1rem;
        padding: 2rem;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        text-align: center;
        max-width: 24rem;
        width: 100%;
        animation: slideIn 0.3s ease-out;
      }

      @keyframes slideIn {
        from {
          opacity: 0;
          transform: translateY(-20px) scale(0.95);
        }
        to {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
      }

      .touch-id-icon {
        position: relative;
        margin-bottom: 1.5rem;
      }

      .touch-id-circle {
        width: 5rem;
        height: 5rem;
        margin: 0 auto;
        border-radius: 50%;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        z-index: 2;
      }

      .touch-id-svg {
        width: 2.5rem;
        height: 2.5rem;
        color: white;
      }

      .touch-id-pulse {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 5rem;
        height: 5rem;
        border: 2px solid #667eea;
        border-radius: 50%;
        animation: pulse 2s infinite;
        z-index: 1;
      }

      .touch-id-pulse-delayed {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 6rem;
        height: 6rem;
        border: 1px solid #667eea;
        border-radius: 50%;
        animation: pulse 2s infinite;
        animation-delay: 0.5s;
        z-index: 0;
      }

      @keyframes pulse {
        0% {
          opacity: 1;
          transform: translate(-50%, -50%) scale(1);
        }
        100% {
          opacity: 0;
          transform: translate(-50%, -50%) scale(1.2);
        }
      }

      .touch-id-title {
        font-size: 1.25rem;
        font-weight: 600;
        color: #1f2937;
        margin-bottom: 0.5rem;
      }

      .touch-id-subtitle {
        color: #6b7280;
        margin-bottom: 1rem;
      }

      .touch-id-instructions {
        background: #eff6ff;
        border-radius: 0.5rem;
        padding: 0.75rem;
        margin-bottom: 1rem;
      }

      .touch-id-tip {
        font-size: 0.875rem;
        color: #1e40af;
        margin: 0;
      }

      .touch-id-status {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        font-size: 0.875rem;
        color: #6b7280;
      }

      .touch-id-indicator {
        width: 0.5rem;
        height: 0.5rem;
        background: #667eea;
        border-radius: 50%;
        animation: pulse 1s infinite;
      }
    `;
    document.head.appendChild(style);
  }

  show() {
    this.isVisible = true;
    this.modalElement.style.display = 'block';
    
    // Adicionar animação de entrada
    setTimeout(() => {
      const modal = this.modalElement.querySelector('.touch-id-modal');
      modal.style.animation = 'slideIn 0.3s ease-out';
    }, 10);
  }

  hide() {
    this.isVisible = false;
    this.modalElement.style.display = 'none';
  }

  destroy() {
    if (this.modalElement && this.modalElement.parentNode) {
      this.modalElement.parentNode.removeChild(this.modalElement);
    }
  }
}
