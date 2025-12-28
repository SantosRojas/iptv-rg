import type { Channel, Stream, Logo } from '../../domain/entities';
import type { IChannelRepository } from '../../domain/repositories';

/**
 * Configuración de las URLs de la API
 */
const API_CONFIG = {
  CHANNELS: 'https://iptv-org.github.io/api/channels.json',
  STREAMS: 'https://iptv-org.github.io/api/streams.json',
  LOGOS: 'https://iptv-org.github.io/api/logos.json',
} as const;

/**
 * Interfaz de respuesta de canal de la API (snake_case)
 */
interface ApiChannel {
  id: string;
  name: string;
  alt_names: string[];
  network: string | null;
  owners: string[];
  country: string;
  categories: string[];
  is_nsfw: boolean;
  launched: string | null;
  closed: string | null;
  replaced_by: string | null;
  website: string | null;
}

/**
 * Interfaz de respuesta de stream de la API
 */
interface ApiStream {
  channel: string;
  feed?: string;
  title?: string;
  url: string;
  referrer?: string;
  user_agent?: string;
  quality?: string;
}

/**
 * Interfaz de respuesta de logo de la API
 */
interface ApiLogo {
  channel: string;
  url: string;
}

/**
 * Mapper para convertir respuestas de API a entidades del dominio
 */
class ChannelMapper {
  static toDomain(apiChannel: ApiChannel): Channel {
    return {
      id: apiChannel.id,
      name: apiChannel.name,
      altNames: apiChannel.alt_names,
      network: apiChannel.network,
      owners: apiChannel.owners,
      country: apiChannel.country,
      categories: apiChannel.categories,
      isNsfw: apiChannel.is_nsfw,
      launched: apiChannel.launched,
      closed: apiChannel.closed,
      replacedBy: apiChannel.replaced_by,
      website: apiChannel.website,
    };
  }

  static streamToDomain(apiStream: ApiStream): Stream {
    return {
      channel: apiStream.channel,
      feed: apiStream.feed,
      title: apiStream.title,
      url: apiStream.url,
      referrer: apiStream.referrer,
      userAgent: apiStream.user_agent,
      quality: apiStream.quality,
    };
  }

  static logoToDomain(apiLogo: ApiLogo): Logo {
    return {
      channel: apiLogo.channel,
      url: apiLogo.url,
    };
  }
}

/**
 * Implementación del repositorio de canales que consume la API de IPTV-org
 * Utiliza un patrón de caché para evitar múltiples peticiones
 */
export class IptvOrgChannelRepository implements IChannelRepository {
  private channelsCache: Channel[] | null = null;
  private streamsCache: Stream[] | null = null;
  private logosCache: Logo[] | null = null;

  async getAll(): Promise<Channel[]> {
    if (this.channelsCache) {
      return this.channelsCache;
    }

    try {
      const response = await fetch(API_CONFIG.CHANNELS);
      
      if (!response.ok) {
        throw new Error(`Error fetching channels: ${response.status}`);
      }

      const apiChannels: ApiChannel[] = await response.json();
      this.channelsCache = apiChannels.map(ChannelMapper.toDomain);
      
      return this.channelsCache;
    } catch (error) {
      console.error('Error fetching channels:', error);
      return [];
    }
  }

  async getAllStreams(): Promise<Stream[]> {
    if (this.streamsCache) {
      return this.streamsCache;
    }

    try {
      const response = await fetch(API_CONFIG.STREAMS);
      
      if (!response.ok) {
        throw new Error(`Error fetching streams: ${response.status}`);
      }

      const apiStreams: ApiStream[] = await response.json();
      this.streamsCache = apiStreams.map(ChannelMapper.streamToDomain);
      
      return this.streamsCache;
    } catch (error) {
      console.error('Error fetching streams:', error);
      return [];
    }
  }

  async getAllLogos(): Promise<Logo[]> {
    if (this.logosCache) {
      return this.logosCache;
    }

    try {
      const response = await fetch(API_CONFIG.LOGOS);
      
      if (!response.ok) {
        throw new Error(`Error fetching logos: ${response.status}`);
      }

      const apiLogos: ApiLogo[] = await response.json();
      this.logosCache = apiLogos.map(ChannelMapper.logoToDomain);
      
      return this.logosCache;
    } catch (error) {
      console.error('Error fetching logos:', error);
      return [];
    }
  }

  /**
   * Limpia el caché del repositorio
   */
  clearCache(): void {
    this.channelsCache = null;
    this.streamsCache = null;
    this.logosCache = null;
  }
}

/**
 * Instancia singleton del repositorio
 */
let repositoryInstance: IptvOrgChannelRepository | null = null;

export function getChannelRepository(): IChannelRepository {
  if (!repositoryInstance) {
    repositoryInstance = new IptvOrgChannelRepository();
  }
  return repositoryInstance;
}
