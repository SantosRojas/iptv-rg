import { COUNTRY_NAMES } from '../../domain/entities';

/**
 * Convierte un código de país ISO 3166-1 alpha-2 a su bandera emoji
 */
export function getCountryFlag(countryCode: string): string {
  if (!countryCode || countryCode.length !== 2) {
    return '📺';
  }

  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map(char => 127397 + char.charCodeAt(0));

  return String.fromCodePoint(...codePoints);
}

/**
 * Obtiene el nombre del país en español a partir de su código
 */
export function getCountryName(code: string): string {
  return COUNTRY_NAMES[code] || code;
}

/**
 * Capitaliza la primera letra de un texto
 */
export function capitalize(text: string): string {
  if (!text) return '';
  return text.charAt(0).toUpperCase() + text.slice(1);
}
