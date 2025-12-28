# Arquitectura del Proyecto IPTV Player

Este proyecto implementa una **Arquitectura Limpia (Clean Architecture)** para facilitar el mantenimiento, testing y escalabilidad.

## Estructura de Capas

```
src/
├── domain/              # Capa de Dominio (núcleo de la aplicación)
│   ├── entities/        # Entidades y modelos de datos
│   └── repositories/    # Interfaces de repositorios (contratos)
│
├── infrastructure/      # Capa de Infraestructura
│   └── repositories/    # Implementaciones de repositorios (APIs, DB, etc.)
│
├── application/         # Capa de Aplicación
│   ├── use-cases/       # Casos de uso (lógica de negocio)
│   ├── utils/           # Utilidades compartidas
│   └── IptvService.ts   # Fachada para los casos de uso
│
├── client/              # Código del lado cliente (browser)
│   ├── ChannelClientService.ts  # Servicio para el navegador
│   ├── ChannelListRenderer.ts   # Renderizado del DOM
│   └── types.ts         # Tipos para el cliente
│
├── components/          # Componentes Astro
├── layouts/             # Layouts de Astro
└── pages/               # Páginas de Astro
```

## Principios SOLID Aplicados

### Single Responsibility (SRP)
Cada clase tiene una única responsabilidad:
- `IptvOrgChannelRepository`: Solo maneja el acceso a datos de la API
- `GetChannelsWithStreamsUseCase`: Solo combina canales con streams
- `ChannelListRenderer`: Solo renderiza la lista en el DOM

### Open/Closed (OCP)
El código está abierto a extensión pero cerrado a modificación:
- Nuevos repositorios pueden implementar `IChannelRepository`
- Nuevos casos de uso se pueden agregar sin modificar los existentes

### Liskov Substitution (LSP)
Las implementaciones pueden sustituirse:
- Cualquier `IChannelRepository` puede usarse en los casos de uso

### Interface Segregation (ISP)
Interfaces específicas y pequeñas:
- `IChannelRepository` define solo los métodos necesarios

### Dependency Inversion (DIP)
Las capas dependen de abstracciones:
- Los casos de uso dependen de `IChannelRepository` (interfaz)
- No dependen de `IptvOrgChannelRepository` (implementación)

## Flujo de Datos

```
[API IPTV-org]
      ↓
[Infrastructure - Repository]
      ↓
[Application - Use Cases]
      ↓
[Application - Service (Facade)]
      ↓
[Components Astro / Client Browser]
```

## Uso

### En componentes del servidor (Astro)
```typescript
import { getIptvService } from '../application';

const service = getIptvService();
const countries = await service.getAvailableCountries();
```

### En código del cliente (browser)
```typescript
import { getChannelClientService, ChannelListRenderer } from '../client';

const service = getChannelClientService();
const channels = await service.fetchChannels({ country: 'ES' });
```

## Agregar nuevas funcionalidades

### Nuevo caso de uso
1. Crear en `application/use-cases/`
2. Implementar la lógica usando repositorios
3. Exportar en `application/use-cases/index.ts`
4. Agregar método en `IptvService.ts`

### Nueva fuente de datos
1. Crear nuevo repositorio en `infrastructure/repositories/`
2. Implementar `IChannelRepository`
3. Inyectar en los casos de uso necesarios

## Beneficios

- ✅ **Testeable**: Cada capa se puede probar de forma aislada
- ✅ **Mantenible**: Cambios aislados a cada responsabilidad
- ✅ **Escalable**: Fácil agregar nuevas funcionalidades
- ✅ **TypeScript**: Tipado fuerte en todo el proyecto
- ✅ **Independiente**: No depende de frameworks específicos
