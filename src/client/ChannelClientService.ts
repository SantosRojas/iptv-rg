import { API_ENDPOINTS } from './config';
import type { ChannelWithStream, ChannelFilters } from './types';

/**
 * Interfaces internas para las respuestas de la API
 */
interface ApiChannel {
  id: string;
  name: string;
  alt_names: string[];
  country: string;
  categories: string[];
  is_nsfw: boolean;
}

interface ApiStream {
  channel: string;
  url: string;
  title?: string;
  quality?: string;
}

interface ApiLogo {
  channel: string;
  url: string;
}

/**
 * Caché de datos para evitar múltiples peticiones
 */
class DataCache {
  private channels: ApiChannel[] | null = null;
  private streams: ApiStream[] | null = null;
  private logos: ApiLogo[] | null = null;

  async getChannels(): Promise<ApiChannel[]> {
    if (!this.channels) {
      const response = await fetch(API_ENDPOINTS.CHANNELS);
      this.channels = await response.json();
    }
    return this.channels!;
  }

  async getStreams(): Promise<ApiStream[]> {
    if (!this.streams) {
      const response = await fetch(API_ENDPOINTS.STREAMS);
      this.streams = await response.json();
    }
    return this.streams!;
  }

  async getLogos(): Promise<ApiLogo[]> {
    if (!this.logos) {
      const response = await fetch(API_ENDPOINTS.LOGOS);
      this.logos = await response.json();
    }
    return this.logos!;
  }

  clear(): void {
    this.channels = null;
    this.streams = null;
    this.logos = null;
  }
}

/**
 * Convierte un código de país a emoji de bandera
 */
function getCountryFlag(countryCode: string): string {
  if (!countryCode || countryCode.length !== 2) return '📺';
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map(char => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

/**
 * Servicio cliente para manejar canales IPTV
 */
export class ChannelClientService {
  private cache = new DataCache();
  private currentChannels: ChannelWithStream[] = [];

  /**
   * Obtiene canales aplicando filtros
   */
  async fetchChannels(filters: ChannelFilters): Promise<ChannelWithStream[]> {
    const { country, category, limit = 200 } = filters;

    const [channels, streams, logos] = await Promise.all([
      this.cache.getChannels(),
      this.cache.getStreams(),
      this.cache.getLogos(),
    ]);

    // Crear mapas para acceso O(1)
    const streamMap = new Map<string, ApiStream>();
    for (const stream of streams) {
      if (!streamMap.has(stream.channel)) {
        streamMap.set(stream.channel, stream);
      }
    }

    const logoMap = new Map<string, string>();
    for (const logo of logos) {
      if (!logoMap.has(logo.channel)) {
        logoMap.set(logo.channel, logo.url);
      }
    }

    // Filtrar y combinar
    const result: ChannelWithStream[] = [];

    for (const channel of channels) {
      const stream = streamMap.get(channel.id);
      if (!stream) continue;
      if (channel.is_nsfw) continue;
      if (country && channel.country !== country) continue;
      if (category && !channel.categories.includes(category)) continue;

      result.push({
        id: channel.id,
        name: channel.name,
        country: channel.country,
        categories: channel.categories,
        streamUrl: stream.url,
        streamTitle: stream.title,
        quality: stream.quality,
        logoUrl: logoMap.get(channel.id) || null,
        flag: getCountryFlag(channel.country),
      });

      if (result.length >= limit) break;
    }

    this.currentChannels = result;
    return result;
  }

  /**
   * Filtra los canales actuales por término de búsqueda
   */
  filterBySearch(searchTerm: string): ChannelWithStream[] {
    if (!searchTerm) {
      return this.currentChannels;
    }

    const term = searchTerm.toLowerCase();
    return this.currentChannels.filter(channel =>
      channel.name.toLowerCase().includes(term)
    );
  }

  /**
   * Obtiene los canales actuales
   */
  getCurrentChannels(): ChannelWithStream[] {
    return this.currentChannels;
  }
}

// Singleton del servicio
let serviceInstance: ChannelClientService | null = null;

export function getChannelClientService(): ChannelClientService {
  if (!serviceInstance) {
    serviceInstance = new ChannelClientService();
  }
  return serviceInstance;
}
