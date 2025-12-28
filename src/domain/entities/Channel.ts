/**
 * Entidad que representa un canal de TV
 */
export interface Channel {
  readonly id: string;
  readonly name: string;
  readonly altNames: string[];
  readonly network: string | null;
  readonly owners: string[];
  readonly country: string;
  readonly categories: string[];
  readonly isNsfw: boolean;
  readonly launched: string | null;
  readonly closed: string | null;
  readonly replacedBy: string | null;
  readonly website: string | null;
}

/**
 * Entidad que representa un stream de video
 */
export interface Stream {
  readonly channel: string;
  readonly feed?: string;
  readonly title?: string;
  readonly url: string;
  readonly referrer?: string;
  readonly userAgent?: string;
  readonly quality?: string;
}

/**
 * Entidad que representa un logo de canal
 */
export interface Logo {
  readonly channel: string;
  readonly url: string;
}

/**
 * Entidad combinada de canal con información de stream
 */
export interface ChannelWithStream {
  readonly id: string;
  readonly name: string;
  readonly country: string;
  readonly categories: string[];
  readonly streamUrl: string;
  readonly streamTitle?: string;
  readonly quality?: string;
  readonly logoUrl: string | null;
  readonly flag: string;
}
