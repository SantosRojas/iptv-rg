import type { Country } from '../../domain/entities';
import { POPULAR_COUNTRY_CODES } from '../../domain/entities';
import type { IChannelRepository } from '../../domain/repositories';
import { getCountryFlag, getCountryName } from '../utils';

/**
 * Resultado del caso de uso GetAvailableCountries
 */
export interface GetCountriesResult {
  countries: Country[];
  popularCountries: Country[];
  otherCountries: Country[];
}

/**
 * Caso de uso: Obtener países disponibles
 * Devuelve la lista de países que tienen canales disponibles
 */
export class GetAvailableCountriesUseCase {
  constructor(private readonly channelRepository: IChannelRepository) {}

  async execute(): Promise<GetCountriesResult> {
    const channels = await this.channelRepository.getAll();
    
    // Obtener códigos de país únicos (excluyendo NSFW)
    const countrySet = new Set<string>();
    for (const channel of channels) {
      if (channel.country && !channel.isNsfw) {
        countrySet.add(channel.country);
      }
    }

    // Mapear a entidades Country
    const allCountries: Country[] = Array.from(countrySet)
      .map(code => ({
        code,
        name: getCountryName(code),
        flag: getCountryFlag(code),
      }))
      .sort((a, b) => a.name.localeCompare(b.name));

    // Separar en populares y otros
    const popularCountries = allCountries.filter(c => 
      POPULAR_COUNTRY_CODES.includes(c.code as typeof POPULAR_COUNTRY_CODES[number])
    );
    
    const otherCountries = allCountries.filter(c => 
      !POPULAR_COUNTRY_CODES.includes(c.code as typeof POPULAR_COUNTRY_CODES[number])
    );

    return {
      countries: [...popularCountries, ...otherCountries],
      popularCountries,
      otherCountries,
    };
  }
}
