/**
 * Tipos para el cliente del navegador
 * Definidos aquí para evitar dependencias con el código del servidor
 */

export interface ChannelWithStream {
  id: string;
  name: string;
  country: string;
  categories: string[];
  streamUrl: string;
  streamTitle?: string;
  quality?: string;
  logoUrl: string | null;
  flag: string;
}

export interface ChannelFilters {
  country?: string;
  category?: string;
  searchTerm?: string;
  limit?: number;
}
