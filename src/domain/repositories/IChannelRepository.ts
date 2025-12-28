import type { Channel, Stream, Logo } from '../entities';

/**
 * Interfaz del repositorio de canales
 * Define el contrato para acceder a los datos de canales
 */
export interface IChannelRepository {
  /**
   * Obtiene todos los canales disponibles
   */
  getAll(): Promise<Channel[]>;

  /**
   * Obtiene todos los streams disponibles
   */
  getAllStreams(): Promise<Stream[]>;

  /**
   * Obtiene todos los logos disponibles
   */
  getAllLogos(): Promise<Logo[]>;
}
