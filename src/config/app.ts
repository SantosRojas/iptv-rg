/**
 * Configuración centralizada de la aplicación
 * Modifica estos valores para personalizar la app
 */

export const APP_CONFIG = {
  /** Nombre de la aplicación */
  NAME: 'RGTV',
  
  /** Descripción corta */
  TAGLINE: 'Tu TV en línea',
  
  /** Descripción del footer */
  FOOTER_TEXT: 'Televisión en línea gratuita',
  
  /** Emoji/icono de la app */
  ICON: '📺',
  
  /** Meta descripción para SEO */
  META_DESCRIPTION: 'Reproductor IPTV - Mira tus canales favoritos',
} as const;

/**
 * Genera el título completo de la página
 */
export function getPageTitle(suffix?: string): string {
  return suffix 
    ? `${APP_CONFIG.NAME} - ${suffix}` 
    : APP_CONFIG.NAME;
}
