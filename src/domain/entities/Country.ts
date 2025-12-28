/**
 * Entidad que representa un país
 */
export interface Country {
  readonly code: string;
  readonly name: string;
  readonly flag: string;
}

/**
 * Códigos de países populares para ordenamiento
 */
export const POPULAR_COUNTRY_CODES = ['ES', 'MX', 'AR', 'CO', 'US', 'PE', 'CL', 'VE'] as const;

/**
 * Mapeo de códigos de país a nombres en español
 */
export const COUNTRY_NAMES: Readonly<Record<string, string>> = {
  'US': 'Estados Unidos',
  'ES': 'España',
  'MX': 'México',
  'AR': 'Argentina',
  'CO': 'Colombia',
  'PE': 'Perú',
  'CL': 'Chile',
  'VE': 'Venezuela',
  'EC': 'Ecuador',
  'GT': 'Guatemala',
  'CU': 'Cuba',
  'BO': 'Bolivia',
  'DO': 'República Dominicana',
  'HN': 'Honduras',
  'PY': 'Paraguay',
  'SV': 'El Salvador',
  'NI': 'Nicaragua',
  'CR': 'Costa Rica',
  'PA': 'Panamá',
  'UY': 'Uruguay',
  'PR': 'Puerto Rico',
  'FR': 'Francia',
  'DE': 'Alemania',
  'IT': 'Italia',
  'GB': 'Reino Unido',
  'UK': 'Reino Unido',
  'PT': 'Portugal',
  'BR': 'Brasil',
  'JP': 'Japón',
  'CN': 'China',
  'KR': 'Corea del Sur',
  'IN': 'India',
  'RU': 'Rusia',
  'CA': 'Canadá',
  'AU': 'Australia',
  'NL': 'Países Bajos',
  'BE': 'Bélgica',
  'CH': 'Suiza',
  'AT': 'Austria',
  'PL': 'Polonia',
  'SE': 'Suecia',
  'NO': 'Noruega',
  'DK': 'Dinamarca',
  'FI': 'Finlandia',
  'IE': 'Irlanda',
  'GR': 'Grecia',
  'TR': 'Turquía',
  'EG': 'Egipto',
  'ZA': 'Sudáfrica',
  'AE': 'Emiratos Árabes',
  'SA': 'Arabia Saudita',
  'IL': 'Israel',
  'PH': 'Filipinas',
  'TH': 'Tailandia',
  'VN': 'Vietnam',
  'ID': 'Indonesia',
  'MY': 'Malasia',
  'SG': 'Singapur',
  'NZ': 'Nueva Zelanda',
  'RO': 'Rumania',
  'HU': 'Hungría',
  'CZ': 'República Checa',
  'SK': 'Eslovaquia',
  'BG': 'Bulgaria',
  'HR': 'Croacia',
  'RS': 'Serbia',
  'UA': 'Ucrania',
  'BY': 'Bielorrusia',
} as const;
