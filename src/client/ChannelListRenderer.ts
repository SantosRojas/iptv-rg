import type { ChannelWithStream } from './types';

/**
 * Evento personalizado cuando se selecciona un canal
 */
export interface ChannelSelectedEvent {
  url: string;
  name: string;
  channel: ChannelWithStream;
}

/**
 * Clase para renderizar la lista de canales en el DOM
 */
export class ChannelListRenderer {
  private container: HTMLElement;
  private countElement: HTMLElement;
  private onChannelSelect?: (event: ChannelSelectedEvent) => void;

  constructor(
    containerId: string,
    countElementId: string,
    onChannelSelect?: (event: ChannelSelectedEvent) => void
  ) {
    const container = document.getElementById(containerId);
    const countElement = document.getElementById(countElementId);

    if (!container || !countElement) {
      throw new Error('Required DOM elements not found');
    }

    this.container = container;
    this.countElement = countElement;
    this.onChannelSelect = onChannelSelect;
  }

  /**
   * Renderiza la lista de canales
   */
  render(channels: ChannelWithStream[]): void {
    if (channels.length === 0) {
      this.renderEmpty();
      return;
    }

    this.container.innerHTML = channels
      .map(channel => this.createChannelItem(channel))
      .join('');

    this.countElement.textContent = `${channels.length} canales disponibles`;
    this.attachEventListeners(channels);
  }

  /**
   * Muestra estado vacío
   */
  renderEmpty(): void {
    this.container.innerHTML = `
      <div class="empty-state">
        <p>No se encontraron canales</p>
        <p class="hint">Prueba con otros filtros</p>
      </div>
    `;
    this.countElement.textContent = '0 canales disponibles';
  }

  /**
   * Muestra mensaje de error
   */
  renderError(message: string = 'Error al cargar los canales'): void {
    this.container.innerHTML = `
      <div class="empty-state">
        <p>${message}</p>
        <p class="hint">Intenta de nuevo más tarde</p>
      </div>
    `;
  }

  /**
   * Crea el HTML de un item de canal
   */
  private createChannelItem(channel: ChannelWithStream): string {
    const logoContent = channel.logoUrl
      ? `<img class="channel-logo" src="${channel.logoUrl}" alt="${channel.name}" loading="lazy" onerror="this.style.display='none';this.nextElementSibling.style.display='flex';"/>
         <span class="channel-logo-fallback" style="display:none;">${channel.flag}</span>`
      : `<span class="channel-logo-fallback">${channel.flag}</span>`;

    return `
      <button 
        class="channel-item" 
        data-url="${channel.streamUrl}"
        data-name="${channel.name}"
        data-id="${channel.id}"
        title="${channel.name}"
      >
        ${logoContent}
        <span class="channel-tooltip">${channel.name}</span>
      </button>
    `;
  }

  /**
   * Adjunta event listeners a los items de canal
   */
  private attachEventListeners(channels: ChannelWithStream[]): void {
    const items = this.container.querySelectorAll('.channel-item');
    const channelMap = new Map(channels.map(ch => [ch.id, ch]));

    items.forEach(item => {
      item.addEventListener('click', () => {
        const id = item.getAttribute('data-id');
        const url = item.getAttribute('data-url');
        const name = item.getAttribute('data-name');
        const channel = id ? channelMap.get(id) : undefined;

        // Actualizar estado activo
        items.forEach(i => i.classList.remove('active'));
        item.classList.add('active');

        // Disparar evento
        if (url && name && channel) {
          window.dispatchEvent(
            new CustomEvent('channel-selected', {
              detail: { url, name, channel },
            })
          );

          this.onChannelSelect?.({ url, name, channel });
        }
      });
    });
  }
}
