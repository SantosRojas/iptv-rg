import type { Country, ChannelWithStream } from '../domain/entities';
import { getChannelRepository } from '../infrastructure/repositories';
import {
  GetAvailableCountriesUseCase,
  GetAvailableCategoriesUseCase,
  GetChannelsWithStreamsUseCase,
  type ChannelFilters,
} from './use-cases';

/**
 * Servicio de IPTV - Fachada para los casos de uso
 * Proporciona una API limpia para los componentes
 */
export class IptvService {
  private readonly countriesUseCase: GetAvailableCountriesUseCase;
  private readonly categoriesUseCase: GetAvailableCategoriesUseCase;
  private readonly channelsUseCase: GetChannelsWithStreamsUseCase;

  constructor() {
    const repository = getChannelRepository();
    this.countriesUseCase = new GetAvailableCountriesUseCase(repository);
    this.categoriesUseCase = new GetAvailableCategoriesUseCase(repository);
    this.channelsUseCase = new GetChannelsWithStreamsUseCase(repository);
  }

  /**
   * Obtiene la lista de países disponibles ordenados
   */
  async getAvailableCountries(): Promise<Country[]> {
    const result = await this.countriesUseCase.execute();
    return result.countries;
  }

  /**
   * Obtiene la lista de categorías disponibles
   */
  async getAvailableCategories(): Promise<string[]> {
    return this.categoriesUseCase.execute();
  }

  /**
   * Obtiene canales con sus streams aplicando filtros
   */
  async getChannelsWithStreams(filters?: ChannelFilters): Promise<ChannelWithStream[]> {
    const result = await this.channelsUseCase.execute(filters);
    return result.channels;
  }
}

// Instancia singleton del servicio
let serviceInstance: IptvService | null = null;

export function getIptvService(): IptvService {
  if (!serviceInstance) {
    serviceInstance = new IptvService();
  }
  return serviceInstance;
}
