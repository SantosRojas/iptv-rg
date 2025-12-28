/**
 * ToastService - Servicio para mostrar notificaciones toast
 */

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastOptions {
  title?: string;
  message: string;
  type?: ToastType;
  duration?: number;
  closable?: boolean;
}

const ICONS: Record<ToastType, string> = {
  success: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
  error: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,
  warning: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
  info: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>`,
};

class ToastService {
  private container: HTMLElement | null = null;

  private getContainer(): HTMLElement {
    if (!this.container) {
      this.container = document.getElementById('toast-container');
      
      // Si no existe, crear el contenedor
      if (!this.container) {
        this.container = document.createElement('div');
        this.container.id = 'toast-container';
        this.container.className = 'toast-container';
        document.body.appendChild(this.container);
      }
    }
    return this.container;
  }

  show(options: ToastOptions): void {
    const {
      title,
      message,
      type = 'info',
      duration = 4000,
      closable = true,
    } = options;

    const container = this.getContainer();
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    toast.innerHTML = `
      <div class="toast-icon">${ICONS[type]}</div>
      <div class="toast-content">
        ${title ? `<div class="toast-title">${title}</div>` : ''}
        <div class="toast-message">${message}</div>
      </div>
      ${closable ? `
        <button class="toast-close" aria-label="Cerrar">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      ` : ''}
      <div class="toast-progress" style="width: 100%; animation: toast-progress ${duration}ms linear forwards;"></div>
    `;

    // Agregar estilos de animación para la barra de progreso
    const style = document.createElement('style');
    style.textContent = `
      @keyframes toast-progress {
        from { width: 100%; }
        to { width: 0%; }
      }
    `;
    toast.appendChild(style);

    container.appendChild(toast);

    // Función para cerrar el toast
    const closeToast = () => {
      toast.classList.add('toast-out');
      toast.addEventListener('animationend', () => {
        toast.remove();
      });
    };

    // Event listener para el botón de cerrar
    const closeBtn = toast.querySelector('.toast-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', closeToast);
    }

    // Auto-cerrar después de la duración
    if (duration > 0) {
      setTimeout(closeToast, duration);
    }
  }

  success(message: string, title?: string): void {
    this.show({ message, title, type: 'success' });
  }

  error(message: string, title?: string): void {
    this.show({ message, title, type: 'error', duration: 6000 });
  }

  warning(message: string, title?: string): void {
    this.show({ message, title, type: 'warning' });
  }

  info(message: string, title?: string): void {
    this.show({ message, title, type: 'info' });
  }
}

// Singleton
export const toast = new ToastService();
