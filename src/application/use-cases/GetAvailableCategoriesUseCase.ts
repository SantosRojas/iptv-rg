import type { IChannelRepository } from '../../domain/repositories';

/**
 * Caso de uso: Obtener categorías disponibles
 * Devuelve la lista de categorías únicas de todos los canales
 */
export class GetAvailableCategoriesUseCase {
  constructor(private readonly channelRepository: IChannelRepository) {}

  async execute(): Promise<string[]> {
    const channels = await this.channelRepository.getAll();
    
    const categorySet = new Set<string>();
    for (const channel of channels) {
      for (const category of channel.categories) {
        categorySet.add(category);
      }
    }

    return Array.from(categorySet).sort();
  }
}
