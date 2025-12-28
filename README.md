# 📺 RGTV

Un reproductor de televisión en línea moderno construido con **Astro** y **TypeScript**, que permite ver canales de TV de todo el mundo de forma gratuita.

![RGTV](https://img.shields.io/badge/Astro-5.x-purple?style=flat-square&logo=astro)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=flat-square&logo=typescript)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

## ✨ Características

- 🌍 **Miles de canales** de más de 200 países
- 🔍 **Búsqueda y filtros** por país y categoría
- 📱 **Diseño responsive** - funciona en desktop y móvil
- 🎨 **UI moderna** con efectos de glass-morphism
- ⚡ **Rendimiento optimizado** con lazy loading
- 📋 **Soporte M3U** - carga tus propias listas
- 🔔 **Notificaciones toast** elegantes

## 🏗️ Arquitectura

Este proyecto implementa una **Arquitectura Limpia (Clean Architecture)** para facilitar el mantenimiento y la escalabilidad:

```
src/
├── domain/              # Entidades e interfaces
├── infrastructure/      # Repositorios (APIs)
├── application/         # Casos de uso y servicios
├── client/              # Código del navegador
├── components/          # Componentes Astro
│   ├── ui/              # Componentes UI reutilizables
│   └── channel/         # Componentes de canales
├── layouts/             # Layouts
└── pages/               # Páginas
```

Para más detalles, ver [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md).

## 🚀 Inicio Rápido

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Construir para producción
npm run build
```

## 🧞 Comandos

| Comando           | Acción                                          |
| :---------------- | :---------------------------------------------- |
| `npm install`     | Instala las dependencias                        |
| `npm run dev`     | Inicia el servidor en `localhost:4321`          |
| `npm run build`   | Construye el sitio para producción en `./dist/` |
| `npm run preview` | Previsualiza el build antes de desplegar        |

## 📡 Fuente de Canales

Los canales de televisión son proporcionados por **[iptv-org](https://github.com/iptv-org/iptv)**, un proyecto de código abierto que recopila enlaces de transmisión IPTV disponibles públicamente de todo el mundo.

### APIs utilizadas:

- 📺 [Channels API](https://iptv-org.github.io/api/channels.json) - Lista de canales
- 🎬 [Streams API](https://iptv-org.github.io/api/streams.json) - URLs de transmisión
- 🖼️ [Logos API](https://iptv-org.github.io/api/logos.json) - Logos de canales

> **Nota**: Este proyecto no aloja ningún contenido de video. Todos los streams son enlaces públicos recopilados por iptv-org.

## 🛠️ Tecnologías

- **[Astro](https://astro.build/)** - Framework web
- **[TypeScript](https://www.typescriptlang.org/)** - Tipado estático
- **[HLS.js](https://github.com/video-dev/hls.js/)** - Reproductor de streams HLS

## 📄 Licencia

Este proyecto está bajo la licencia MIT. Ver el archivo [LICENSE](LICENSE) para más detalles.

## 🙏 Créditos

- **[iptv-org](https://github.com/iptv-org)** - Por recopilar y mantener la base de datos de canales IPTV de todo el mundo
- **[Astro](https://astro.build/)** - Por el increíble framework

---

<p align="center">
  Hecho con ❤️ usando Astro
</p>
