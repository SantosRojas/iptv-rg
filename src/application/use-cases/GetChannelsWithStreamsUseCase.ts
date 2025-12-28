import type { ChannelWithStream } from '../../domain/entities';
import type { IChannelRepository } from '../../domain/repositories';
import { getCountryFlag } from '../utils';

/**
 * Filtros para buscar canales
 */
export interface ChannelFilters {
  country?: string;
  category?: string;
  searchTerm?: string;
  limit?: number;
  excludeNsfw?: boolean;
}

/**
 * Resultado del caso de uso GetChannelsWithStreams
 */
export interface GetChannelsResult {
  channels: ChannelWithStream[];
  total: number;
}

/**
 * Caso de uso: Obtener canales con sus streams
 * Combina información de canales, streams y logos
 */
export class GetChannelsWithStreamsUseCase {
  constructor(private readonly channelRepository: IChannelRepository) {}

  async execute(filters: ChannelFilters = {}): Promise<GetChannelsResult> {
    const {
      country,
      category,
      searchTerm,
      limit = 200,
      excludeNsfw = true,
    } = filters;

    // Obtener datos en paralelo
    const [channels, streams, logos] = await Promise.all([
      this.channelRepository.getAll(),
      this.channelRepository.getAllStreams(),
      this.channelRepository.getAllLogos(),
    ]);

    // Crear mapas para acceso O(1)
    const streamMap = new Map(
      streams.map(stream => [stream.channel, stream])
    );
    
    const logoMap = new Map(
      logos.map(logo => [logo.channel, logo.url])
    );

    // Filtrar y combinar
    const result: ChannelWithStream[] = [];
    const searchLower = searchTerm?.toLowerCase();

    for (const channel of channels) {
      // Excluir canales NSFW
      if (excludeNsfw && channel.isNsfw) continue;

      // Verificar que tenga stream
      const stream = streamMap.get(channel.id);
      if (!stream) continue;

      // Aplicar filtro de país
      if (country && channel.country !== country) continue;

      // Aplicar filtro de categoría
      if (category && !channel.categories.includes(category)) continue;

      // Aplicar filtro de búsqueda
      if (searchLower) {
        const matchesName = channel.name.toLowerCase().includes(searchLower);
        const matchesAltName = channel.altNames.some(
          name => name.toLowerCase().includes(searchLower)
        );
        if (!matchesName && !matchesAltName) continue;
      }

      // Crear entidad combinada
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

      // Aplicar límite
      if (result.length >= limit) break;
    }

    return {
      channels: result,
      total: result.length,
    };
  }
}
